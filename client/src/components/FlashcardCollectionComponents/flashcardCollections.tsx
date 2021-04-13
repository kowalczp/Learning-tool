import { Container, IconButton, Typography, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import axios from 'axios';
import { useState, useEffect, ReactElement } from 'react';
import { AddCircle, ArrowForward, FeaturedPlayListOutlined } from '@material-ui/icons';
import { StyledGrid, CollectionHeader, Settings, AssessmentStyle, CreateCollection, RowDiv } from './styles';
import { grey } from '@material-ui/core/colors';
import GradeIcon from '@material-ui/icons/Grade';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

interface ICollection {
    name: string;
    flashcards: string[];
    isOwned: boolean;
    _id: string;
    subscribedUsers: number;
}

const CollectionView = (): ReactElement => {
    const url = '/api/flashcard-collection';

    const [data, setData] = useState([]);

    const history = useHistory();

    useEffect(() => {
        axios.get(url).then((json) => setData(json.data || []));
    }, []);

    const handleUnsubscribeClick = (id: string) => () => {
        axios
            .delete(`/api/subscribe/${id}`, { withCredentials: true })
            .then(() => {
                setData(data.filter((el: ICollection) => el._id !== id));
            })
            .catch(console.log);
    };

    const handleLearn = (id: string) => () => {
        history.push(`/powtorka/${id}`);
    };

    return (
        <Container maxWidth="xs" justify-content="center">
            <Link to="/stworz-kolekcje">
                <CreateCollection>
                    <Typography style={{ margin: '0 auto' }} color="textPrimary" align="center" variant="subtitle1">
                        Stwórz nową kolekcję
                    </Typography>
                    <IconButton>
                        <AddCircle style={{ fontSize: 30, color: grey[800], marginLeft: '5px' }} />
                    </IconButton>
                </CreateCollection>
            </Link>
            {data.map((collection: ICollection) => (
                <StyledGrid key={collection._id}>
                    <CollectionHeader>{collection.name}</CollectionHeader>
                    <Grid container direction="row" justify="center" alignItems="baseline">
                        <RowDiv style={{ alignItems: 'center' }}>
                            <FeaturedPlayListOutlined style={{ fontSize: 20, color: grey[800], marginRight: '5px' }} />
                            <Typography variant="body1" display="inline">
                                Fiszki: {collection.flashcards}
                            </Typography>
                        </RowDiv>
                        <RowDiv style={{ alignItems: 'center' }}>
                            {collection.isOwned ? (
                                <StarBorderIcon color="primary" style={{ fontSize: 20 }} />
                            ) : (
                                <GradeIcon color="primary" style={{ fontSize: 20 }} />
                            )}
                            <Typography variant="body1" display="inline">
                                {collection.subscribedUsers}
                            </Typography>
                        </RowDiv>
                    </Grid>
                    <Settings>
                        {collection.isOwned ? (
                            <Link to={`/kolekcje/${collection._id}`}>
                                <BuildOutlinedIcon style={{ color: grey[700], fontSize: 42 }} />
                            </Link>
                        ) : (
                            <IconButton onClick={handleUnsubscribeClick(collection._id)}>
                                <DeleteIcon style={{ color: grey[700], fontSize: 42 }} />
                            </IconButton>
                        )}
                        <AssessmentStyle>
                            <Link to="/profil">
                                <AssessmentIcon style={{ color: grey[700], fontSize: 42 }} />
                            </Link>
                        </AssessmentStyle>
                        <IconButton onClick={handleLearn(collection._id)}>
                            <ArrowForward style={{ color: grey[700], fontSize: 42 }} />
                        </IconButton>
                    </Settings>
                </StyledGrid>
            ))}
        </Container>
    );
};

export default CollectionView;
