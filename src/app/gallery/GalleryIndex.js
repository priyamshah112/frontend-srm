import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import UserIcon from "../../assets/images/chat/User.svg";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import ListSubheader from "@material-ui/core/ListSubheader";
import Lightbox from "react-image-lightbox";
import Grid from "@material-ui/core/Grid";
import InfiniteScroll from "react-infinite-scroll-component";
import CircularProgress from "@material-ui/core/CircularProgress";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import GalleryService from "./GalleryService";

const REACT_APP_BACKEND_IMAGE_URL = process.env.REACT_APP_BACKEND_IMAGE_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    overflow: "auto",
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
  },
  gridContainer: {
    height: "100%",
    overflow: "auto",
    width: "100%",
  },

  headingContainer: {
    display: "flex",
    alignItems: "right",
    justifyContent: "center",
    "& div": {
      margin: "3px",
    },
  },
  headingText: {
    fontWeight: 500,
    fontSize: "0.875rem",
    fontStyle: "normal",
    color: theme.palette.common.bastille,
    marginLeft: "2px",
  },
  gridList: {
    width: "100%",
    height: "100%",
  },
  titleBar: {
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
  },
  icon: {
    color: theme.palette.common.quartz,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  iconButton: {
    "&.MuiIconButton-root": {
      backgroundColor: "transparent",
    },
  },
  lightBoxContainer: {
    zIndex: 1800,
  },
}));

const tileImageList = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/id/1002/300",
];

const GalleryIndex = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matches = useMediaQuery("(max-width:400px)");

  const [openLightbox, setOpenLightBox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [tileData, setTileData] = useState([]);

  useEffect(() => {
    let changeImages = true;
    const fetchImages = async () => {
      try {
        const response = await GalleryService.fetchImages(
          props.token,
          currentPage
        );

        if (response.status === 200 && changeImages) {
          setTileData([...tileData, ...response.data.data.data]);
          if (
            response.data.data.current_page !== response.data.data.last_page
          ) {
            setCurrentPage(currentPage + 1);
          } else {
            setHasMore(false);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchImages();

    return () => {
      changeImages = false;
    };
  }, []);
  const handleFileUpload = () => {
    history.push("/gallery/upload");
  };

  const handleOpenLightbox = (index) => {
    setOpenLightBox(true);
    setPhotoIndex(index);
  };
  const handleDeleteImage = async (id) => {
    try {
      const response = await GalleryService.deleteImage(props.token, id);
      if (response.status === 200) {
        setTileData(
          tileData.filter((tile) => {
            return tile.id !== id;
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };
  const fetchImagesOnScroll = async () => {
    try {
      const response = await GalleryService.fetchImages(
        props.token,
        currentPage
      );
      console.log(response);
      if (response.status === 200) {
        setTileData([...tileData, ...response.data.data.data]);
        if (response.data.data.current_page !== response.data.data.last_page) {
          setCurrentPage(currentPage + 1);
        } else {
          setHasMore(false);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div
        style={{
          margin: "10px",
          backgroundColor: "transparent",
          height: "100%",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            disableRipple
            disableFocusRipple
            classes={{ root: classes.iconButton }}
            onClick={handleFileUpload}
          >
            <PhotoCamera />
            <Typography className={classes.headingText}>Upload</Typography>
          </IconButton>
        </div>
        <div style={{ marginBottom: "5px" }}></div>
        <div className={classes.root} id="scrollable">
          <InfiniteScroll
            dataLength={tileData.length}
            next={fetchImagesOnScroll}
            hasMore={hasMore}
            loader={
              <>
                <div
                  className={classes.loading}
                  style={{
                    width: "100%",
                    textAlign: "center",
                    marginTop: "8px",
                  }}
                >
                  {/* <Typography>Loading...</Typography> */}
                  <CircularProgress color="primary" size={30} />
                </div>
                <br />
              </>
            }
            scrollableTarget="scrollable"
            scrollThreshold={0.5}
          >
            <GridList
              cellHeight={200}
              spacing={2}
              cols={matches ? 2 : 3}
              className={classes.gridList}
            >
              {tileData.map((tile, index) => {
                return (
                  <GridListTile
                    key={tile.id}
                    style={{ listStyleType: "none" }}
                    cols={1}
                  >
                    <img
                      src={`${REACT_APP_BACKEND_IMAGE_URL}/${tile.img_path}/${tile.img_name}`}
                      alt={tile.img_name}
                      className={classes.image}
                      onClick={() => handleOpenLightbox(index)}
                    />
                    <GridListTileBar
                      title={""}
                      titlePosition="bottom"
                      actionIcon={
                        <IconButton
                          className={classes.icon}
                          onClick={() => handleDeleteImage(tile.id)}
                        >
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      }
                      actionPosition="right"
                      className={classes.titleBar}
                    />
                  </GridListTile>
                );
              })}
            </GridList>
          </InfiniteScroll>
          <br />
          <br /> <br /> <br />
        </div>
      </div>

      {openLightbox && (
        <div style={{ zIndex: 1800 }}>
          <Lightbox
            mainSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${tileData[photoIndex].img_path}/${tileData[photoIndex].img_name}`}
            nextSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${
              tileData[(photoIndex + 1) % tileData.length].img_path
            }/${tileData[(photoIndex + 1) % tileData.length].img_name}`}
            prevSrc={`${REACT_APP_BACKEND_IMAGE_URL}/${
              tileData[(photoIndex + tileData.length - 1) % tileData.length]
                .img_path
            }/${
              tileData[(photoIndex + tileData.length - 1) % tileData.length]
                .img_name
            }`}
            onCloseRequest={() => setOpenLightBox(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + tileData.length - 1) % tileData.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % tileData.length)
            }
            reactModalStyle={{
              overlay: {
                zIndex: 1800,
              },
            }}
          />
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedRole: state.auth.selectedRole,
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(GalleryIndex);
