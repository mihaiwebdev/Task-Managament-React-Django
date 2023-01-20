import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listAllBoards } from '../actions/boardActions'
import Header from '../Components/Header'
import Sidebar from '../Components/Sidebar'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Task from '../Components/Task'


const HomeScreen = () => {

    const dispatch = useDispatch()

    const [taskData, setTaskData] = useState()

    const boardList = useSelector(state => state.boardList)
    const { error, loading, board } = boardList

    useEffect(() => {

        dispatch(listAllBoards())

    }, [dispatch])

    
    const showTaskModal = (task) => {
        document.querySelector('.task-modal').style.display = 'block'

        let subtasks = []

        board[3].subtasks.map(subtask => {
            if (subtask.task === task.id) {
                subtasks.push(subtask)
            }

            return null
        })
        
        setTaskData([task, subtasks])        
    }


    return (
        <>
            <Header />

            <main className='d-flex'>

                <Sidebar />

                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> 
                 :  board.length < 1 ? (<div className='w-100 d-flex justify-content-center align-items-center'><p className='gray-text'>No board selected ...</p></div>)
                 : (     
                        <div className='tasks-layout'>
                            {board[1].cols.length < 1 
                             ? <div className='mx-auto my-auto d-flex flex-column align-items-center'>
                                    <p className='gray-text'>This board is empty. Create a new column to get started.</p>
                                    <button className='mb-5 btn-primary-l add-task'>
                                        + Add New Column
                                    </button>
                                </div>
                             : 
                             (<div className='d-flex'>

                                {board[1].cols.map((col) => (
                                    <div key={col.id} className='board-col'>
                                        <div className='d-flex mt-3'>
                                            {col.name.toLowerCase() === 'todo' ? (<div className='dot blue-dot'></div>)
                                            : col.name.toLowerCase() === 'doing' ? (<div className='dot purple-dot'></div>)
                                            : col.name.toLowerCase() === 'done' ? (<div className='dot green-dot'></div>)
                                            : (<div className='dot'></div>)    
                                            }
                                            <h2 className='col-title ms-2'>{col.name.toUpperCase()}</h2>
                                        </div>
                                        
                                        {board[2].tasks.map(task => 
                                            task.column === col.id && (
                                                <div key={task.id} className="task-card" onClick={() => showTaskModal(task)}>
                                                    <h2 className="task-card-title">{task.title}</h2>
                                                    <p className="task-card-subtasks">subtasks</p>
                                                </div>
                                            )
                                        )}
                                        
                                    </div> 
                                ))}

                                <div className='new-col'>
                                    <h2>+ New Column</h2>
                                </div>

                             </div>) 
                            }
                        </div>
                    )
                }

                <Task taskData={taskData}/>
                
            </main>
        </>
    )
}

export default HomeScreen
