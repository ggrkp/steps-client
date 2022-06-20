
const Welcome = (props) => {
    const clickHandler = () => {
        fetch('/api/hello')
            .then(response => response.json())
            .then(data => console.log(data.message))


            }
    return (
            <div>
                <button className="btn btn-primary" onClick={clickHandler}>click to fetch</button>
            </div>
        )
    }

    export default Welcome