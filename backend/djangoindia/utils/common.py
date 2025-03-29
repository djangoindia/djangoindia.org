from functools import wraps

from djangoindia.db.models.common import BackgroundTaskLog


def log_bg_task(func):
    """
        A decorator to log background task details.

        Usage:
        -------
        >>> from djangoindia.utils.common import log_bg_task
        >>> @log_bg_task
        >>> def my_celery_task(*args, **kwargs):
        >>>     # Task logic here
        >>>     pass
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        task_log = BackgroundTaskLog.objects.create(
            name=func.__name__,
            status="started",
            args=list(args),
            kwargs=kwargs
        )
        task_log.status = "in_progress"
        result = func(*args, **kwargs)
        task_log.status = "complete"
        # if task doesn't return error/expection result will be None
        task_log.error = str(result) 
        task_log.save(update_fields=["status", "error"])
        return result
    return wrapper
