import React, {Component} from 'react';
import './App.css';
import Customer from './component/Customer';
import Progress from "./component/Progress";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: "auto"
    },
    table: {
        minWidth: 1080
    },
    progress: {
        margin: theme.spacing(2)
    }
})

// 리액트 라이프 사이클
// 1) constructor()
// 2) componentWillMount()
// 3) render()
// 4) componentDidMount()

// props or state의 변경 => shouldComponentUpdate() => render()를 재 실행하여 뷰를 업데이트 함

class App extends Component {

    state = {
        customers: "",
        completed: 0
    }

    componentDidMount() {
        this.timer = setInterval(this.progress, 20);
        this.callApi()
            .then(res => this.setState({customers: res}))
            .catch(err => console.log(err));
    }

    // 비동기 처리
    callApi = async () => {
        const response = await fetch('/api/customers');
        const body = await response.json();
        return body;
    }

    // 프로그레스 애니메이션 함수
    progress = () => {
        const {completed} = this.state;
        this.setState({
            completed: completed >= 100 ? 0 : completed + 1
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>번호</TableCell>
                            <TableCell>이미지</TableCell>
                            <TableCell>이름</TableCell>
                            <TableCell>생년월일</TableCell>
                            <TableCell>성별</TableCell>
                            <TableCell>직업</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.customers ? this.state.customers.map(c => {
                            return (
                                <Customer
                                    key={c.id}
                                    id={c.id}
                                    image={c.img}
                                    name={c.name}
                                    birthday={c.birthday}
                                    gender={c.gender}
                                    job={c.job}
                                />
                            );
                        }) :
                            <Progress completed={this.state.completed}/>
                        }
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

export default withStyles(styles)(App);
