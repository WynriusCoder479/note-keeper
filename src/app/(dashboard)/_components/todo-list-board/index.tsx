import { TodoList } from '@prisma/client'
import NoPinnedTodoList from './no-pinned-todo-list'

type TodoListBoardProps = {
	todoLists: TodoList[]
}

const TodoListBoard = ({ todoLists }: TodoListBoardProps) => {
	if (todoLists.length === 0) return <NoPinnedTodoList />

	return <div>TodoListBoard</div>
}

export default TodoListBoard
