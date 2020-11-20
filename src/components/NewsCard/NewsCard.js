import React, { useState, useEffect, createRef } from 'react';
import { Card, CardContent, CardMedia, CardActions, CardActionArea, Button, Typography } from '@material-ui/core'
import classNames from 'classnames'

import useStyles from './styles'

function NewsCard({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) {
    const [elRefs, setElRefs] = useState([])
    const classes = useStyles()

    const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50)

    useEffect(() => {
        setElRefs((refs) => Array(20).fill().map((_, j) => refs[j] || createRef()))
    }, [])

    useEffect(() => {
        if(i === activeArticle && elRefs[activeArticle]) {
            scrollToRef(elRefs[activeArticle])
        }
    }, [i, activeArticle, elRefs])

    return (
        <div>
           <Card ref={elRefs[i]} className={classNames(classes.card, activeArticle === i ? classes.activeCard : null)}>
                <CardActionArea href={url} target="_blank">
                    <CardMedia className={classes.media} image={urlToImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR0wro5oTna2a3vNy0ZxFFYh9EI_GYLFRLpww&usqp=CAU"}/>
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary" component="h2">{(new Date(publishedAt)).toDateString()}</Typography>
                        <Typography variant="body2" color="textSecondary" component="h2">{source.name}</Typography>
                    </div>
                    <Typography className={classes.title} gutterBottom variant="h5">{title}</Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary">Learn More</Button>
                    <Typography variant="h5" color="textSecondary">{i+1}</Typography>
                </CardActions>
           </Card>
        </div>
    );
}

export default NewsCard;