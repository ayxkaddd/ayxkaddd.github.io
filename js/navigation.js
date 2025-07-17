document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll("nav a")

  const Snowflakes = window.Snowflakes
  const updateSongTitle = window.updateSongTitle

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const href = this.getAttribute("href")

      navLinks.forEach((l) => l.classList.remove("border-b", "border-white"))
      if (href === "projects.html") {
        navLinks[1].classList.add("border-b", "border-white")
      } else {
        navLinks[0].classList.add("border-b", "border-white")
      }

      fetch(href)
        .then((response) => response.text())
        .then((html) => {
          const parser = new DOMParser()
          const doc = parser.parseFromString(html, "text/html")

          const newContent = doc.querySelector(".main-content")

          document.querySelector(".main-content").innerHTML = newContent.innerHTML

          document.title = doc.title

          history.pushState(null, doc.title, href)

          if (window.sf) {
            window.sf.destroy()
          }
          window.sf = new Snowflakes({
            color: "#ffffff",
            speed: 0.2,
            wind: true,
          })

          setTimeout(() => {
            if (window.player && typeof updateSongTitle === "function") {
              updateSongTitle()
            }
          }, 100)

          const scripts = newContent.querySelectorAll("script")
          scripts.forEach((script) => {
            if (script.src) {
              const newScript = document.createElement("script")
              newScript.src = script.src
              document.body.appendChild(newScript)
            } else {
              try {
                eval(script.textContent)
              } catch (e) {
                console.log("Script execution error:", e)
              }
            }
          })
        })
        .catch((error) => {
          console.error("Error loading page:", error)
          window.location.href = href
        })
    })
  })

  window.addEventListener("popstate", () => {
    fetch(window.location.pathname)
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, "text/html")
        const newContent = doc.querySelector(".main-content")
        document.querySelector(".main-content").innerHTML = newContent.innerHTML
        document.title = doc.title

        navLinks.forEach((l) => l.classList.remove("border-b", "border-white"))
        if (window.location.pathname.includes("projects.html")) {
          navLinks[1].classList.add("border-b", "border-white")
        } else {
          navLinks[0].classList.add("border-b", "border-white")
        }

        if (window.sf) {
          window.sf.destroy()
        }
        window.sf = new Snowflakes({
          color: "#ffffff",
          speed: 0.2,
          wind: true,
        })

        setTimeout(() => {
          if (window.player && typeof updateSongTitle === "function") {
            updateSongTitle()
          }
        }, 100)
      })
      .catch((error) => {
        console.error("Error loading page:", error)
        window.location.reload()
      })
  })
})
