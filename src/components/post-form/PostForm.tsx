import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import {  useNavigate } from 'react-router-dom';
import dbService from '../../appwrite/Db';
import  { RTE,CommonInput,Selection, CommonBtn } from '../index';
import { useSelector } from 'react-redux';

interface RootState {
  auth: {
    status: boolean;
    userDetails: {
      id: string;
      name: string;
      email: string;
    } | null;
  };
}

function PostForm({post}) {
  const{register,handleSubmit,control,setValue,getValues,watch}=useForm({
    defaultValues:{
      title:post?.title||"",
      slug:post?.slug||"",
      content:post?.content||"",
      status:post?.status||"active",
    }
  })
  const navigate=useNavigate()
const userData=useSelector((state:RootState)=>state.auth.userDetails)
const submit=async(data:any):Promise<void>=>{
if(post){
  
  const file = data.featuredImage?.[0]?await dbService.uploadFile(data.featuredImage[0]):null;
  if(file){
    await dbService.deletePost(post.featuredImage)
  }
  const dbPost = await dbService.updatePost(post.$id, { ...data,
featuredImage:file?file.$id:undefined});
if(dbPost){
  navigate(`/post/${dbPost.$id}`)
}
}
else{
  const file=!data.image[0]?await dbService.uploadFile(data.image[0]):null;

  if(file){
    const fileId=file.$id
    data.featuredImage=fileId
   const dbPost= await dbService.createPost({...data,userId:userData.$id,})
   if(dbPost){
    navigate(`/post/${dbPost.$id}`)
   }
  }

}
}

const slugTransform=useCallback((value):string=>{
  if(value && typeof value==="string"){
    return value
    .trim()
    .toLowerCase()
    .replace(/^[a-zA-Z\d\s]/g,"-")
    .replace(/\s/g, "-")

  }
  return ""
},[]);

useEffect(()=>{
  const subscription=watch((value,{name})=>{
    if(name==="title"){
      setValue("slug",slugTransform(value.title,{shouldValidate:true}))
    }
  })

  return()=>{
    subscription.unsubscribe()
  }

},[watch,slugTransform,setValue])

  return (
    <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
      <div className='w-2/3 px-2'>
      <CommonInput label='Title' placeholder='Title'
      className='mb-4'
      {...register("title",{
        required:true,
      })}/>
      <CommonInput label='Slug' placeholder='Slug'
      className='mb-4'
      {...register("slug",{
        required:true,
      })}
      onInput={(e)=>{setValue("slug",slugTransform(e.currentTarget.value),{shouldValidate:true})}}/>
      </div>
      <RTE label="content" name="content" control={control}  defaultValue={getValues("content")}/>
      <div className='w-1/3 px-2'>
      <CommonInput
       type="file"
        className='mb-4 '
         accept="image/png, image/jpg, image/jpeg,image/webp image/gif image/svg+xml" 
         {...register("image",{required:!post})}/> 

         {post && (<div>

          <img src={dbService.getFilePreview(post.featuredImage)} alt={post.title} className='rounded-lg' />
         </div>)}

         <Selection options={["active","inactive"]}  label='status' className='mb-4' {...register("status",{required:true})}/>

         <CommonBtn type="submit"  bgColor={post?"bg-blue-500":"bg-green-500"}className='w-full'>
          {post?"Update Post":"Create Post"}
         </CommonBtn>

      </div>
    </form>
  );
}

export default PostForm
