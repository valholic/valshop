import { useEffect, useState } from "react";
import { Button, Gap, InputImage, InputSelect, InputTPEN, Link, PreviewImg, Tag, Textarea } from "../../../components";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
    const params = useParams();
    const pid = params.pid;
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [type, setType] = useState('');
    const [tag, setTag] = useState('');
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [isOld, setIsOld] = useState(false);

    function handleAddTag() {
        tags.push(tag);
        setTag('');
    }

    function handleDeleteTag(selectedTag) {
        const newTags = tags.map(tag => {
            if(tag === selectedTag) {
                return;
            } else {
                return tag;
            }
        })

        setTags(newTags);
    }

    function handleAddImage(e) {
        const images = Object.values(e.target.files).map(img => {
            return img;
        })

        const imagesPreview = Object.values(e.target.files).map(img => {
            return URL.createObjectURL(img);
        })
        
        if (imagePreview.length !== 0 && image.length !== 0) {
            const newImagesPreview = imagePreview.concat(imagesPreview);
            const newImages = image.concat(images);
            
            setImagePreview(newImagesPreview);
            setImage(newImages);
        } else if(imagePreview.length === 0 && image.length === 0) {
            setImagePreview(imagesPreview);
            setImage(images);
        }
    }

    function handleDeleteImage(imgPrev, dImage) {
        const newPreviewImages = imagePreview.map(img => {
            if(img === imgPrev) {
                return;
            } else {
                return img;
            }
        });

        const newImages = image.map(img => {
            if(img === dImage) {
                return;
            } else {
                return img;
            }
        });

        setImagePreview(newPreviewImages);
        setImage(newImages);
    }

    function onSubmit(e) {
        e.preventDefault();

        const data = new FormData();
        data.append('name', name);
        data.append('price', price);
        data.append('description', description);
        data.append('stock', stock);
        data.append('type', type);
        tags.map(tag => {
            return data.append('tag', tag);
        })
        image.map(img => {
            return data.append('product_images', img);
        })

        axios.patch(`https://val-shops.vercel.app/v1/product/edipro/${pid}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            navigate(-1);
        })
        .catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        if(!isOld) {
            axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${pid}`)
            .then(result => {
                setName(result.data.data.name);
                setPrice(result.data.data.price);
                setDescription(result.data.data.description);
                setStock(result.data.data.stock);
                setTags(result.data.data.tag);
                setType(result.data.data.type);
                setIsOld(true);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [isOld, pid])

    return (
        <div className="w-full h-auto bg-slate-100">
            <div className="w-3/5 h-auto p-5 m-auto bg-cyan-100">
                <form className="flex flex-wrap w-4/5 m-auto gap-y-6" onSubmit={onSubmit}>
                    <fieldset className="flex flex-wrap w-full gap-y-3">
                        <legend className="mb-5 text-3xl font-bold text-center">Sell your product!</legend>
                        <InputTPEN type={'text'} name={'text'} label={"Product's name"} placeholder={"Your product's name..."} handleChange={setName} value={name} addSize={'w-full'} required={true} />
                        <Textarea name={'description'} label={"Product's description"} placeholder={"Explain your product..."} handleChange={setDescription} value={description} required={true} addSize={'w-full'} />
                    </fieldset>
                    <fieldset className="flex w-full gap-x-3">
                        <InputTPEN type={'number'} name={'price'} label={"Set your product's price"} handleChange={setPrice} value={price} addSize={'w-2/5'} addMargin={'m-0'} required={true} />
                        <InputTPEN type={'number'} name={'stock'} label={"Your product's stock available"} handleChange={setStock} value={stock} addSize={'w-2/5'} addMargin={'m-0'} required={true} />
                    </fieldset>
                    <fieldset className="flex flex-wrap w-full gap-y-3">
                        <InputTPEN type={'text'} name={'tag'} label={'Give minimal 5 tag for your product'} placeholder={'Start the tag by #. Example: #beauty'} handleChange={setTag} value={tag} addSize={'w-4/5'} addMargin={'m-0'} />
                        <Button addSize={'w-1/6 h-8 mt-8 ml-[19px]'} type={'button'} buttonName={'Enter'} onClick={handleAddTag} />
                        <div className="flex flex-wrap items-center w-full h-auto gap-2 px-2 py-2 bg-white rounded-md">
                            {tags.map((tag, i) => {
                                if(tag) {
                                    return <Tag key={i} tags={tag} handleTag={handleDeleteTag} />
                                } else {
                                    return;
                                }
                            })}
                        </div>
                        <InputSelect name={'type'} values={['Cosmetic', 'Decor', 'Drink', 'Electronic', 'Fashion', 'Food', 'Furniture', 'Health', 'Sport']} value={type} label={"What's your product type ?"} handleChange={setType} />
                    </fieldset>
                    <fieldset>
                        <InputImage name={'product'} label={'Set your product sample!'} multiple={true} onChange={(e) => {
                                handleAddImage(e);
                            }} />
                        <p className="text-sm font-bold">You need to input all your images because the images that you have input will not be restored</p>
                        <div className="flex flex-wrap w-full h-auto gap-2 p-2 mt-4 bg-white rounded-md justify-evenly">
                            {imagePreview && imagePreview.map(img => {
                                if(img) {
                                    return <PreviewImg img={img} key={img} file={image} handleClick={handleDeleteImage} />
                                } else {
                                    return;
                                }
                            })}
                        </div>
                    </fieldset>
                    <Button type={'submit'} buttonName={'Save changes'} addSize={'w-full h-8'} />
                    <Link linkName={'Cancel'} addClass={'mt-5 w-full'} onClick={() => {
                        navigate(-1);
                    }} />
                    <Gap height={'50px'} />
                </form>
            </div>
        </div>
    )
}
