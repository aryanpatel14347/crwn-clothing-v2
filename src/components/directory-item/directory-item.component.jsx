import './directory-item.styles.scss';

import {DirectoryItemContainer, Body, BackgroundImage} from './directory-item.styles';
import {useNavigate} from "react-router-dom";
const DirectoryItem = ({category: {imageUrl, title, route}}) => {

    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);

    return(
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage imageUrl={imageUrl} />
            <Body>
                <h2>{title}</h2>
                <p>Shop Now</p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;
