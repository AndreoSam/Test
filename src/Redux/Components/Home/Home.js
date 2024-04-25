import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAll, getCategory, geteachCat, searchItem } from "../../Reducer/mediaSlice";
import "./Home.css";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Home = () => {
    let [search, setSearch] = useState("");
    const [cat, setCat] = useState([]);
    // const [alldata, setAlldata] = useState([]);
    const [eachcat, setEachcat] = useState([]);
    const dispatch = useDispatch();
    const [selectedItem, setSelectedItem] = useState("");

    //get all
    const getAlldata = () => {
        dispatch(getAll())
            .then((res) => {
                // console.log("Get all data: ", res.payload.products);
                // setAlldata(res.payload.products);
                setEachcat(res.payload.products);
            })
            .catch((err) => {
                console.log("Get Error: ", err);
            });
    };

    //get data
    const getCat = () => {
        dispatch(getCategory())
            .then((res) => {
                // console.log("Get data: ", res.payload);
                setCat(res.payload);
            })
            .catch((err) => {
                console.log("Get Error: ", err);
            });
    };

    useEffect(
        () => {
            getCat();
            getAlldata();
            handleItemClick(selectedItem);
        },
        [dispatch],
        [selectedItem]
    );

    const handleItemClick = (name) => {
        setSelectedItem(name);
        //post category item name
        // const itemName = (() => {
        dispatch(geteachCat(name))
            .then((res) => {
                // console.log("Get data: ", res.payload.products);
                setEachcat(res.payload.products);
            })
            .catch((err) => {
                // console.log("Get Error: ", err);
            });
        // });
    };

    const searchHandler = (() => {
        dispatch(searchItem(search))
            .then((res) => {
                console.log("Search Success", search, res.payload.products);
                setEachcat(res.payload.products);
            })
    })

    // console.log("selectedItem: ", selectedItem);
    // console.log(img);
    // console.log("eachcat: ", eachcat);

    return (
        <div className="home_div_1">
            <div className="home_div_left">
                <div className="category_name_css">Category Name</div>
                <div>
                    {cat.map((item) => (
                        <div key={item.key} className="list_css_1">
                            <li>
                                <Link
                                    to="#"
                                    onClick={() => handleItemClick(item)}
                                    className="list_link_css"
                                >
                                    {item}
                                </Link>
                            </li>
                        </div>
                    ))}
                </div>
            </div>
            <div className="home_div_right">
                <div style={{ margin: "10px" }}>
                    <input
                        style={{ height: "20px", marginLeft: "5px" }}
                        type="text"
                        placeholder="Item name"
                        onChange={(event) => {
                            setSearch(event.target.value);
                        }}
                    />
                    <Button size="small" onClick={searchHandler} className="go_button_css">Search</Button>
                </div>

                <Grid container>
                    {eachcat.map((prod) => (
                        <div key={prod.key} className="list_css">
                            <Grid item xs={6}>
                                <Item>
                                    <Card
                                        style={{
                                            width: "250px",
                                            height: "300px",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={prod.thumbnail}
                                            title="green iguana"
                                        />
                                        <CardContent>
                                            <Typography
                                                gutterBottom
                                                variant="subtitle1"
                                                component="div"
                                            >
                                                {prod.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Category: {prod.category}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Price: ${prod.price}
                                            </Typography>
                                        </CardContent>
                                        <CardActions
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Button size="small" variant="contained" color="success">
                                                <Link
                                                    to={`/view/${prod.id}`}
                                                    style={{ textDecoration: "none", color:"white" }}
                                                >
                                                    Details
                                                </Link>
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Item>
                            </Grid>
                        </div>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default Home;
