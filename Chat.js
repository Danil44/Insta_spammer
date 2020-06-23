class Chat {
  constructor({ page, conversationId }) {
    this.conversationId = conversationId;
    this.page = page;
  }

  openConversation() {
    return new Promise(async (res, rej) => {
      try {
        await this.page.evaluate(async id => {
          function wait() {
            return new Promise(res => setTimeout(() => res(), 1000));
          }

          let linkWasFound = false;
          let availableTries = 20;

          function findLink() {
            let links = [...document.querySelectorAll(".rOtsg")];

            links.forEach(link => {
              const splittedLink = link.href.split("/");
              const linkId = splittedLink[splittedLink.length - 1];
              
              if (linkId === id) {
                linkWasFound = true;
                link.click();
              }
            });
          }
          console.log("::Searching for the conversation...");
          while (!linkWasFound && !!availableTries) {
            await wait();
            findLink();

            if (!linkWasFound) {
              document.querySelector(".N9abW").scrollTop += 100;
            }

            availableTries--;
          }
          if (!linkWasFound) {
            throw Error;
          }
        }, await this.conversationId);
        res();
      } catch (error) {
        console.log(error);
        rej("Conversation was not found");
      }
    });
  }
}

module.exports = Chat;
