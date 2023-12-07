import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getTodos } from '../data/todoApi'
import { useEffect, useRef, useState } from 'react'
import { set } from "../features/todoSlice"
import MainHeader from '../components/MainHeader'
import { Filter, Status, Todo } from '../types'
import StatusSection from '../components/StatusSection'

function MainPage() {
    const dispatch = useDispatch();
    const [filters, setFilters] = useState<Filter[]>([]);

    useEffect(() => {
        console.log(filters);
        getTodos(filters)
            .then((data: Todo[]) => {
                dispatch(set(data));
            })
            .catch(err => {
                console.error(err);
            })
    }, [filters])

    return (
        <>
            <MainHeader addFilter={(filter) => setFilters([...filters, filter])} removeFilter={(filter) => setFilters(filters.filter(f => f !== filter))} />
            <div className="board-list">
                {[Status.Created, Status.Progress, Status.Done].map(status => <StatusSection key={status} status={status} />)}
            </div>
            <Outlet />
        </>

    );
}

export default MainPage;