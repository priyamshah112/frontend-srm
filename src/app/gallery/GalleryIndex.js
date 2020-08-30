import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    //backgroundColor: theme.palette.background.paper,
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
    width: "auto",
    height: "auto",
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

const tileData = [
  {
    img_code: "img_1",
    img_path: "https://picsum.photos/200/300",
    img_name: "img_1",
  },
  {
    img_code: "img_2",
    img_path: "https://picsum.photos/200/300",
    img_name: "img_2",
  },
  {
    img_code: "img_3",
    img_path: "https://picsum.photos/200/300",
    img_name: "img_3",
  },
  {
    img_code: "img_4",
    img_path: "https://picsum.photos/id/1002/300",
    img_name: "img_4",
  },
];

const tileImageList = [
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/200/300",
  "https://picsum.photos/id/1002/300",
];

const GalleryIndex = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const [openLightbox, setOpenLightBox] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleFileUpload = () => {
    history.push("/gallery/upload");
  };

  const handleOpenLightbox = (index) => {
    setOpenLightBox(true);
    setPhotoIndex(index);
  };

  return (
    <>
      <div style={{ margin: "10px", backgroundColor: "transparent" }}>
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
        <div className={classes.root}>
          <div>
            <GridList
              cellHeight={200}
              spacing={2}
              cols={3}
              className={classes.gridList}
            >
              {tileData.map((tile, index) => (
                <GridListTile key={tile.img_code}>
                  <img
                    src={tile.img_path}
                    alt={tile.img_name}
                    className={classes.image}
                    cols={2}
                    onClick={() => handleOpenLightbox(index)}
                  />
                  <GridListTileBar
                    title={""}
                    titlePosition="bottom"
                    actionIcon={
                      <IconButton className={classes.icon}>
                        <DeleteOutlineOutlinedIcon />
                      </IconButton>
                    }
                    actionPosition="right"
                    className={classes.titleBar}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </div>
      </div>

      {openLightbox && (
        <div style={{ zIndex: 1800 }}>
          <Lightbox
            mainSrc={tileImageList[photoIndex]}
            nextSrc={tileImageList[(photoIndex + 1) % tileImageList.length]}
            prevSrc={
              tileImageList[
                (photoIndex + tileImageList.length - 1) % tileImageList.length
              ]
            }
            onCloseRequest={() => setOpenLightBox(false)}
            onMovePrevRequest={() =>
              setPhotoIndex(
                (photoIndex + tileImageList.length - 1) % tileImageList.length
              )
            }
            onMoveNextRequest={() =>
              setPhotoIndex((photoIndex + 1) % tileImageList.length)
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

export default GalleryIndex;
