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
    console.log('video product IDs', videoProductIds)

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

    const pickVideo = (e) => {
        const file = e.target.files[0];
        const video = videoRef.current;
        console.log('video SHOW', video)
        setVideoFile(file);

        if (file && video){
            video.src = URL.createObjectURL(file);
            // console.log('vid source', video.src)
            video.onloadedmetadata = () => {
                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                const ctx = canvas.getContext('2d');
console.group('CTX', ctx)
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                const base64Image = canvas.toDataURL('image/png');

                // console.log('Base64 Image:', base64Image);

                axios.post(`${baseURL}videos/upload-base64-image`, {base64Image})
                    .then(response => {
                        console.log('Returned Img URL', response.data.imageUrl) 
                        setThumbnail(response.data.imageUrl);
                    })
                    .catch(error => {
                        console.log('Error uploading image:', error.response ? error.response.data : error.message);
                    })
            }
        }
        
        setSelectedFile(file);
        setIsSelected(true);

    }
    
 

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleFirstProduct = (e) => {
    console.log('ee', e)
  }

  const handleSubmit =  async () => {
    console.log('checking')
    try {
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
                                console.log('RES DATA', res.data)
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
                        });
        
        // axios call
    } catch (error) {
        console.error('Error uploading video:', error)
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
          {/* {thumbnail && <img src={thumbnail} alt="Video Thumbnail"  className={styles.thumbnail}/>} */}
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
  )
}
