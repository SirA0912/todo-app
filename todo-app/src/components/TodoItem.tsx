import { HStack, Checkbox, Text, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

interface TodoItemProps {
  text: string
  completed: boolean
  onToggle: () => void
  onDelete: () => void
}

export default function TodoItem({ text, completed, onToggle, onDelete }: TodoItemProps) {
  return (
    <HStack
      p={4}
      spacing={4}
      w="100%"
      borderBottomWidth="1px"
      borderColor="gray.200"
    >
      <Checkbox
        isChecked={completed}
        onChange={onToggle}
        colorScheme="green"
      />
      <Text
        flex={1}
        textDecoration={completed ? 'line-through' : 'none'}
        color={completed ? 'gray.500' : 'gray.900'}
      >
        {text}
      </Text>
      <IconButton
        aria-label="Delete task"
        icon={<DeleteIcon />}
        onClick={onDelete}
        colorScheme="red"
        variant="ghost"
        size="sm"
      />
    </HStack>
  )
}