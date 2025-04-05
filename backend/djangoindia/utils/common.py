from functools import wraps

from django.utils import timezone
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
            start_datetime=timezone.now(),
            args=list(args),
            kwargs=kwargs
        )
        try:
            result = func(*args, **kwargs)
        except Exception as ex:
            result = str(ex)
        if result is None:
            task_log.status = BackgroundTaskLog.StatusChoices.SUCCESSFULL
        else:
            task_log.status = BackgroundTaskLog.StatusChoices.FAILURE
        # if task doesn't return error/expection result will be None
        task_log.log = str(result) if result else None 
        task_log.end_datetime = timezone.now()
        task_log.save()
        return result
    return wrapper
