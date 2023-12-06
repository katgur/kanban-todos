import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getTodos } from '../data/todoApi'
import { useEffect, useRef } from 'react'
import { set } from "../features/todoSlice"
import MainHeader from '../components/MainHeader'
import { Status, Todo } from '../types'
import StatusSection from '../components/StatusSection'

function MainPage() {
    const dispatch = useDispatch();
    const isLoaded = useRef(false);

    useEffect(() => {
        if (isLoaded.current) {
            return;
        }
        getTodos()
            .then((data: Todo[]) => {
                dispatch(set(data));
                isLoaded.current = true;
            })
            .catch(err => {
                console.error(err);
                isLoaded.current = true;
            })
    }, [isLoaded])

    return (
        <>
            <MainHeader />
            <div className="board-list">
                {[Status.Created, Status.Progress, Status.Done].map(status => <StatusSection key={status} status={status} />)}
            </div>
            <Outlet />
        </>

    );
}

export default MainPage;