import { useRef, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { SwipeBox, SwipeArea } from './SwipePanelStyle';

const SwipePanel = ({ children }) => {

    const [ hide, setHide ] = useState(false);

    const togglePannel = (mode) => {
        if(mode === 'hide' && hide) return;
        if(mode === 'show' && !hide) return;
        setHide(!hide);
    };

    const swipeHandler = useSwipeable({
        onSwipedUp: () => togglePannel('show'),
        onSwipedDown: () => togglePannel('hide')
    });

    return (
        <SwipeBox className={ hide && 'hide' } >
            <SwipeArea {...swipeHandler} />
            { children }
        </SwipeBox>
    );
}

export default SwipePanel;