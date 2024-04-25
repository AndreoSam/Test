import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { singleItem } from '../../Reducer/mediaSlice';
import { useDispatch } from 'react-redux';
import "./View.css"
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

const View = () => {
    const [item, setItem] = useState([])
    const [img, setImg] = useState([])
    let { id } = useParams()
    // console.log("ID: ", id);
    const dispatch = useDispatch();

    //get single Item
    const getCat = (() => {
        dispatch(singleItem(id))
            .then((res) => {
                // console.log("Get data: ", res.payload);
                console.log("Get image data: ", res.payload.images);
                setItem(res.payload)
                setImg(res.payload.images)

            })
            .catch((err) => {
                console.log("Get Error: ", err);
            })
    });

    useEffect(() => {
        getCat()
    }, [dispatch]);

    return (
        <div className='view_css'>
            <div className='view_css_left'>
                <div className='image_css_main'>
                    <Carousel >
                        {
                            img.map((image) =>
                            (
                                <Paper key={image.id}
                                // className='image_css'
                                >
                                    <img src={image} alt="" style={{ Width: "100%", height:"500px" }} />
                                    {/* <Button className="CheckButton">
                                    </Button> */}
                                </Paper>
                            ))
                        }
                    </Carousel>

                </div>
            </div>
            <div className='view_css_right'>
                <div className='view_css_right_1'>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                    <p><b>Price: </b>${item.price}</p>
                </div>
            </div>
        </div>
    )
}

export default View