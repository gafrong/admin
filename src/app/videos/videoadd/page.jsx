'use client'

import awsURL from '@/assets/common/awsUrl'
import baseURL from '@/assets/common/baseUrl'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import LoadingSpinner from '@/components/LoadingSpinner'
import useUserStore from '@/store/zustand'
import axios from 'axios'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import styles from './videoadd.module.css'

export default function Page() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const token = useUserStore((state) => state?.token);
    const userId = user?._id;

    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isSelected, setIsSelected] = useState(false);

    const [selectedFirstProduct, setSelectedFirstProduct] = useState();
    const [productList, setProductList] = useState([]);
    const [videoProducts, setVideoProducts] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [videoProductIds, setVideoProductIds] = useState([]);
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail]= useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [uploadProgress, setUploadProgress] = useState(0);

    const videoRef = useRef(null);

    useEffect(() => {
        if (userId) {
            axios.get(`${baseURL}products/admin/${userId}`).then((res) => {
                setProductList(res.data)
            })

            return () => {
                setProductList()
            }
        }
    }, [userId])

    const pickVideo = async (e) => {
        const file = e.target.files[0];
        const video = videoRef.current;
        setVideoFile(file);
    
        if (file && video) {
            video.src = URL.createObjectURL(file);
    
            const processVideo = async () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
    
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
                const base64Image = canvas.toDataURL('image/png');
    
                const imageSizeInBytes = base64Image.length;
                const MAX_ACCEPTABLE_SIZE = 102400;
    
                if (imageSizeInBytes > MAX_ACCEPTABLE_SIZE) {
                    console.log('resizing!!!');
    
                    // Resize the image if it exceeds the acceptable size
                    const scaleFactor = MAX_ACCEPTABLE_SIZE / imageSizeInBytes;
                    const resizedCanvas = document.createElement('canvas');
                    const resizedCtx = resizedCanvas.getContext('2d');
    
                    resizedCanvas.width = video.videoWidth * scaleFactor;
                    resizedCanvas.height = video.videoHeight * scaleFactor;
    
                    // Seek to the second frame (2 seconds assuming a frame rate of 1 frame per second)
                    video.currentTime = 2;
    
                    // Draw the resized video frame on the resized canvas
                    resizedCtx.drawImage(video, 0, 0, resizedCanvas.width, resizedCanvas.height);
    
                    // Convert the resized canvas content to a base64 image
                    const resizedBase64Image = resizedCanvas.toDataURL('image/jpeg');
    
                    try {
                        const response = await axios.post(`${baseURL}videos/upload-base64-image`, { base64Image: resizedBase64Image });
                        console.log('img url resized', response.data)
                        setThumbnail(response.data.imageUrl);
                    } catch (error) {
                        console.log('Error uploading image:', error.response ? error.response.data : error.message);
                    }
                } else {
                    console.log('no resizing!');
                    try {
                        const response = await axios.post(`${baseURL}videos/upload-base64-image`, { base64Image });
                        console.log('img url', response.data)
                        setThumbnail(response.data.imageUrl);
                    } catch (error) {
                        console.log('Error uploading image:', error.response ? error.response.data : error.message);
                    }
                }
            };
    
            video.onloadedmetadata = () => {
                // Add 'loadeddata' event listener to ensure the first frame is loaded
                video.addEventListener('loadeddata', () => {
                    // Add 'seeked' event listener to capture the second frame
                    video.addEventListener('seeked', processVideo, { once: true });
    
                    // Seek to the second frame (2 seconds assuming a frame rate of 1 frame per second)
                    video.currentTime = 0.1;
                });
            };
        }
    
        setSelectedFile(file);
        setIsSelected(true);
    };
    
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleSubmit =  async () => {
    if (!videoFile || !thumbnail || !description || videoProductIds.length === 0) {
        // Show an error message or prevent submission
        alert('모든 정보를 정확히 선택/입력하시기 바랍니다.');
        setThumbnail(null);
        return;
    }
    try {
        setLoading(true);
        const fileSizeInMB = selectedFile.size / 1000000;;
        if (fileSizeInMB > 50) {
            alert('영상 파일이 초과되었습니다. 15초 이하(50MB)의 영상을 선택하세요.');
            setLoading(false);
            return;
        }
        const formData = new FormData();
        
        formData.append('video', videoFile);
        formData.append("image", thumbnail);
        formData.append('description', description);
        formData.append(
            "videoItems",
            Array.isArray(videoProductIds)
                ? videoProductIds
                : [videoProductIds]
        );
        
        const response = await axios.post(`${baseURL}videos/upload/${userId}`, formData, {
                            headers: {
                                "Content-Type": "multipart/form-data",
                                Authorization: `Bearer ${token}`,
                            },
                            onUploadProgress: (progressEvent) => {
                                const progress = Math.round(
                                    (progressEvent.loaded / progressEvent.total) * 100
                                );
                                setUploadProgress(progress);
                            },
                        })
                        .then((res) => {
                            if (res.data) {
                                setSelectedProducts([]);
                                setVideoProductIds([]);
                                setDescription('');
                                setThumbnail(null);
                                setLoading(false);
                                router.push('/videos/video-add-complete')
                            } else {
                                alert("영상을 올릴 수 없습니다");
                            }
                        })
                        .catch((err) => {
                            console.log("error message", err.message);
                            setUploadProgress(0);
                            setSelectedProducts([]);
                            setVideoProductIds([]);
                            setDescription('');
                            setThumbnail(null);
                            setLoading(false);
                        });
        
        // axios call
    } catch (error) {
        console.error('Error uploading video:', error);
        setLoading(false);
    }
  }

  const handleProductSelect = (product, index) => {
    if (videoProducts.some((p) => p.id === product.id)) {
      // If the product's id is already in videoProducts, remove it
      setVideoProducts(videoProducts.filter((p) => p.id !== product.id))
    } else {
      // If the product's id is not in videoProducts, add it
      setVideoProducts([...videoProducts, product])
    }
  }

  useEffect(() => {
    // Update videoProductIds whenever videoProducts changes
    setVideoProductIds(videoProducts.map((p) => p.id))
  }, [videoProducts])

  return (
    <>
        {loading ?
            <LoadingSpinner />
        :
        <div className="pl-5 pt-5">
        <h1 className="mb-10 text-2xl">동영상 등록</h1>
        <div className="pl-5">
            <h2 className="mb-5">1. 동영상 파일 선택</h2>
            <div className="pl-5">
            <div>
                <div className={`flex items-center space-x-2 ${styles.btn}`}>
                <Plus className="h-4 w-4" />
                <Label htmlFor="video" className={styles.pointer}>
                    동영상 파일 선택
                </Label>
                </div>
                <input
                    type="file"
                    accept="video/*"
                    onChange={pickVideo}
                    id="video"
                    className="hidden"
                />
            </div>
            {videoRef && (
                <video ref={videoRef} className={styles.selectedVideo} />
            )}
            {isSelected ?
                <div className="mt-5">
                <p className="text-xs">파일명: {selectedFile.name}</p>
                <p className="text-xs">파일타입: {selectedFile.type}</p>
                <p className="text-xs">
                    파일 사이즈: {(selectedFile.size / 1000000).toFixed(2)}mb
                </p>
                </div>
            : <p className="mt-5 text-xs">
                (동영상 파일은 .mp4, .mov, .avi로 가능하며 사이즈는 50mb 이하로
                업로드 가능합니다.)
                </p>
            }
            </div>

            <h2 className="mb-5 mt-10">2. 동영상 설명</h2>
            <div className="pl-5">
            <Textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="예) 스트레이트하고 와이드한 실루엣이 특징적인 데님"
                className="mt-1 w-96"
            />
            </div>
            <h2 className="mb-5 mt-10">3. 동영상 관련 상품 선택</h2>
            <div className="flex pl-5">
            {videoProducts.length > 0 &&
                videoProducts.map((product, index) => (
                <div key={index} className={styles.selectedProductImages}>
                    <img
                    src={awsURL + product.image}
                    alt={`Product ${index}`}
                    className={styles.productImg}
                    />
                </div>
                ))}
            <Dialog>
                <DialogTrigger asChild>
                <Button variant="secondary" className={styles.border}>
                    <Plus className="h-4 w-4" />
                </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>동영상 상품</DialogTitle>
                    <DialogDescription>
                    동영상과 연관된 상품(들)을 선택하세요
                    </DialogDescription>
                </DialogHeader>
                <div className="grid max-h-[500px] gap-4 overflow-y-auto py-4">
                    {productList?.map((product, index) => (
                    <div key={index} className={styles.productItem}>
                        <div className={styles.checkbxContainer}>
                        <Checkbox
                            id={product.id}
                            className={styles.checkbox}
                            onClick={() => handleProductSelect(product, index)}
                        />
                        </div>
                        <img
                        src={awsURL + product.image}
                        alt={`Product ${index}`}
                        className={styles.productImg}
                        />
                    </div>
                    ))}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button type="button">확인</Button>
                    </DialogClose>
                </DialogFooter>
                </DialogContent>
            </Dialog>
            </div>
            <div className="mt-10 pl-5">
            <Button className="mt-5" onClick={handleSubmit}>
                업로드
            </Button>
            </div>
        </div>
        </div>
        }
    </>
  )
}
