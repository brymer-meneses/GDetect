from typing import Optional, Set, NamedTuple


class Task(NamedTuple):
    email: str
    status: Optional[str]


class Queue:
    def __init__(self) -> None:
        self._processing: Set[Task] = set()
        self._finished: Set[Task] = set()
        return

    def remove_from_queue(self, task: Task) -> None:
        self._processing.remove(task)
        self._finished.add(task)
        return

    def is_processing(self, task: Task) -> bool:
        if task in self._processing:
            return True
        else:
            return False

    def is_finished(self, task: Task) -> bool:
        if task in self._finished:
            return True
        else:
            return False

    def add_to_queue(self, task: Task) -> None:
        self._processing.add(task)
        return


class ProcessTask:
    def __init__(self, task: Task, queue: Queue):
        self.task = task
        self.queue = queue

    def __enter__(self):
        self.queue.add_to_queue(self.task)
        pass

    def __exit__(self, exc_type, exc_value, exc_traceback):
        self.queue.remove_from_queue(self.task)
