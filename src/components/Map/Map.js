const Map = ({ geolocation, moveLocation }) => {
    return (
        <form>
            <input type="texts" onChange={event => moveLocation(event)} />
            <span>{ geolocation }</span>
            <button>시도 입력</button>
        </form>
    )
}

export default Map;