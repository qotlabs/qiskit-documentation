#!/usr/bin/env python3

import http.client
import time
import multiprocessing

def flood():
    code = 200
    count = 1
    total_time = 0
    max_time = 0
    min_time = 100
    exception = ""
    try:
        while True:
            t = time.time()
            conn = http.client.HTTPConnection("127.0.0.1", 8000)
            conn.request("GET", "/api/search?module=api&query=circuit")
            code = conn.getresponse().status
            conn.close()
            t = time.time() - t
            total_time += t

            match code:
                case 200:
                    max_time = max(max_time, t)
                    min_time = min(min_time, t)
                    count += 1
                case 503:
                    pass
                case _:
                    break
    except Exception as e:
        exception = str(e)
    return code, count, 1000*total_time/count, 1000*min_time, 1000*max_time, exception


if __name__ == "__main__":
    POOL_SIZE = 100
    with multiprocessing.Pool(POOL_SIZE) as pool:
        async_results = [pool.apply_async(flood) for _ in range(POOL_SIZE)]
        for async_result in async_results:
            async_result.wait()
        for async_result in async_results:
            code, count, mean_time, min_time, max_time, exception = async_result.get()
            print(f"{exception}: sent {count} requests, last status {code}, "
                   f"time mean {mean_time:.1f} ms, min {min_time:.1f} ms, max {max_time:.1f} ms")
