export default function retry(callback, times, interval = 1000) {
    /**
     * Повторяет запрос, если произошла ошибка
     *
     *
     * Пример:
     * function randfail() {
     *      let r = Math.random();
     *      console.log(r);
     *      if (r < 0.9) throw r;
     *      return r;
     *  }
     *
     *  let res;
     *  retry(() => {res = randfail()}, 100, 10)
     */
    if (times > 0) {
        try {
            callback();
        } catch (error) {
            console.error(`Call failed, retrying... (${times} attempts left)`, error);
            setTimeout(() => retry(callback, times - 1, interval), interval);
        }
    }
}
