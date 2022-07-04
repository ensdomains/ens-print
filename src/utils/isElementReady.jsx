export function isElementReady(selector) {
  return new Promise((resolve, _) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }
    new MutationObserver((_mutationRecords, observer) => {
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        observer.disconnect();
      });
    }).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  });
}
