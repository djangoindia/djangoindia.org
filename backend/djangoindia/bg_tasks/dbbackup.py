import logging

from celery import shared_task

from django.core.management import call_command


logger = logging.getLogger(__name__)


@shared_task(
    name="djangoindia.bg_tasks.dbbackup.nightly_db_backup",
    bind=True,
)
def nightly_db_backup(self):
    """
    Perform database backup using Django's dbbackup management command
    """
    try:
        logger.info("Starting database backup...")
        call_command("dbbackup", verbosity=2)
        logger.info("Database backup completed successfully")
        return True
    except Exception as exc:
        logger.error(f"Database backup failed: {exc}")
        return False
