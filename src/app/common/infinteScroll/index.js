import React from 'react'
import useStyle from './styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import InfiniteScroll from 'react-infinite-scroll-component'

const InfiniteRoll = (props) =>{
    const classes = useStyle()
    const { data, onScroll,hasMore } = props
    return(
        <InfiniteScroll
            className={classes.InfiniteScroll}
            dataLength={data.length}
            next={onScroll}
            hasMore={hasMore}
            loader={
                <>
                    <div className={classes.loading}>
                        <CircularProgress color='primary' size={30} />
                    </div>
                    <br />
                </>
            }
            scrollableTarget='scrollable'
            scrollThreshold={0.2}
        >
            {props.children}
        </InfiniteScroll>
    )
}

export default InfiniteRoll;