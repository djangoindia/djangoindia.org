import logging
import time


logger = logging.getLogger(__name__)


class LogResponseTimeMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        start_time = time.time()
        response = self.get_response(request)
        duration = time.time() - start_time
        logger.info("\n")
        logger.info(f"Response time for {request.path}: {duration:.4f} seconds")
        return response
