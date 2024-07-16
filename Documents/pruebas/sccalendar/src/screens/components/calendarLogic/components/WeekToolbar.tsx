import { Row, Col } from 'antd';
import {
    toolbar,
} from './styles.ts';
import moment from 'moment';
import Typography from "@mui/material/Typography";
import {useSelector} from "react-redux";

function WeekToolbar(props: any) {
    const events = useSelector(state => state.events);
    const formattedDate = moment(props.startDate).format('MMM YYYY');
    return (
        <Row type="flex" gutter={3} style={toolbar}>
            <Col span={4}>
                <Typography component={'h5'} variant={'h5'} align={'right'}>
                {formattedDate}
                </Typography>
            </Col>
            <Col span={20}>
                <Typography component={'h6'} variant={'h6'} align={'center'}>
                    Usted está viendo la {events.screenName?.name || ''}
                </Typography>
            </Col>
        </Row>
    );
}

export default WeekToolbar;
