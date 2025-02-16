import logging
from celery import shared_task
from django.core.management import call_command
logger = logging.getLogger(__name__)

@shared_task
def nightly_db_backup():
    try:
        logger.info("Starting database backup...")
        call_command('dbbackup')
        logger.info("Backup completed successfully")
        return True
    except Exception as e:
        logger.error(f"Backup failed: {str(e)}")
        return False