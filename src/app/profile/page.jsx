import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
    return (
        <div className="pl-5 pt-5">
            <Avatar className="w-[100px] h-[100px]">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>Channel Store</div>
            <div>@channel_official</div>
            <div>test@mail.com</div>
            <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae id, distinctio officia doloremque cumque fuga. Et autem sapiente distinctio, quia aliquid, voluptatibus facilis, reiciendis placeat ex minus nesciunt impedit obcaecati?</div>
        </div>
    );
}
