const initState = {
  tasks: [],
  filter: "all",
};

const taskreducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "ISDONE":
      return {
        ...state,
        tasks: state.tasks.map((todo) =>
          todo.id === action.payload ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };

      return {
        ...state,
        tasks: [...state.tasks],
      };
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter((el) => el.id !== action.payload),
      };
    case "EDIT":
      return {
        ...state,
        tasks: state.tasks.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, description: action.payload.description }
            : todo
        ),
      };
    case "Filter":
      return {
        ...state,
        filter: action.payload,
      };

    default:
      return state;
  }
};

export default taskreducer;
