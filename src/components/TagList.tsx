const colors = {
    'violet': '#EEE1FD', 
    'green': '#BAF8CF',
    'red': '#FED6CC',
    'orange': '#FFDCB6',
    'light-blue': '#B8E6FF',
    'lime': '#D8FCB0',
    'blue': '#C6D9FF',
    'yellow': '#FFF4C7'
}

function TagList({ className, tags }) {
    return (
        <span className={className ? className + " tag-list" : "tag-list"}>
            {tags.map(tag => {
                return <div key={tag} style={{backgroundColor: colors[tag], width: 40, height: 18, borderRadius: 2}} />
            })}
        </span>
    )
}

export default TagList;
