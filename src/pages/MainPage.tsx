import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getTodos } from '../data/todoService'
import { useEffect, useState } from 'react'
import { set } from "../features/todoSlice"
import MainHeader from '../components/MainHeader'
import { Filter, Status, Todo } from '../types'
import StatusSection from '../components/StatusSection'
import mainStyle from "../style/main.module.css"

function MainPage() {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState<Filter[]>([]);

    useEffect(() => {
        getTodos(filters)
            .then((data: Todo[]) => {
                dispatch(set(data));
            })
            .catch(err => {
                console.error(err);
            })
    }, [filters, dispatch])

    return (
        <>
            <MainHeader addFilter={(filter) => setFilters([...filters, filter])} removeFilter={(filter) => setFilters(filters.filter(f => f !== filter))} />
            <main className={mainStyle.boardList}>
                {[Status.Created, Status.Progress, Status.Done].map(status => <StatusSection key={status} status={status} />)}
                <Outlet />
            </main>
        </>

    );
}

export default MainPage;