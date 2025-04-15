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
            task_log.status = BackgroundTaskLog.StatusChoices.SUCCESSFULL
            task_log.log = str(result)
        except Exception as e:
            task_log.status = BackgroundTaskLog.StatusChoices.FAILURE
            task_log.log = str(e)
        finally:
            task_log.end_datetime = timezone.now()
            task_log.save()
        return wrapper
