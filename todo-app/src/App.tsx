import { useState, type FormEvent } from 'react'
import {
  Container,
  VStack,
  Heading,
  Input,
  Button,
  Box,
  useColorModeValue,
} from '@chakra-ui/react'
import TodoItem from './components/TodoItem'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [newTodo, setNewTodo] = useState('')
  const bg = useColorModeValue('white', 'gray.800')

  const addTodo = (e: FormEvent) => {
    e.preventDefault()
    if (newTodo.trim() === '') return

    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo.trim(),
        completed: false
      }
    ])
    setNewTodo('')
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading size="lg">Todoリスト</Heading>

        <Box as="form" onSubmit={addTodo} width="100%">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="新しいタスクを入力"
            size="lg"
            mb={4}
          />
          <Button
            type="submit"
            colorScheme="blue"
            width="100%"
            size="lg"
          >
            タスクを追加
          </Button>
        </Box>

        <Box
          width="100%"
          bg={bg}
          borderRadius="lg"
          boxShadow="sm"
          overflow="hidden"
        >
          <VStack spacing={0} align="stretch">
            {todos.length === 0 ? (
              <Box p={4} textAlign="center" color="gray.500">
                タスクがありません
              </Box>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={() => toggleTodo(todo.id)}
                  onDelete={() => deleteTodo(todo.id)}
                />
              ))
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}
