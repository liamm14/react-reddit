import React from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import {
  Link,
  CardMedia,
  Card,
  CardContent,
  Typography
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { Classes } from "@material-ui/styles/mergeClasses/mergeClasses";

const styles = (theme: Theme) => ({
  post: {
    border: `1px solid ${theme.palette.divider}`,
    margin: theme.spacing(0.5, 0),
    backgroundColor: grey[200],
    display: "flex",
    "&:hover": {
      borderColor: "black"
    }
  },
  details: {
    display: "flex",
    flexDirection: "column" as "column"
  },
  content: {
    flex: "1 0 auto"
  },
  thumbnail: {
    width: 100,
    minWidth: 100,
    height: 100,
    backgroundColor: "gray",
    color: "white"
  },
  link: {
    padding: theme.spacing(0, 2),
    textDecoration: "none"
  },
  votes: {
    display: "flex",
    flexDirection: "column" as "column",
    margin: 5,
    textAlign: "center" as "center",
    justifyContent: "center",
    minWidth: 60
  }
});

export interface PostProps {
  classes: Classes;
  items: any;
  comments: any;
}

const Post = (props: PostProps) => {
  const { classes, items, comments } = props;
  items && console.log("items", items);
  comments && console.log("comments", comments);

  return (
    <>
      <Link className={classes.link} href={items.url} target="_blank">
        <Card className={classes.post}>
          <div className={classes.votes}>
            <Typography>{items.ups}</Typography>
          </div>
          <CardMedia className={classes.thumbnail} image={items.thumbnail} />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {items.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                u/{items.author} - r/{items.subreddit}
              </Typography>
            </CardContent>
          </div>
        </Card>
      </Link>
      {comments.map((comment: any) => (
        <Card className={classes.post} key={comment.id}>
          <div className={classes.votes}>
            <Typography>{comment.ups}</Typography>
          </div>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {comment.body}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                u/{comment.author}
              </Typography>
            </CardContent>
          </div>
        </Card>
      ))}
    </>
  );
};

export interface AsyncAppState {
  postsBySubreddit: any;
  selectedSubreddit: string;
}

export default withStyles(styles)(Post);
