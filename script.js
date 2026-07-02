(function () {
  const config = window.UNCLE_SAM_CONFIG || {};
  const caInput = document.getElementById("ca-input");
  const copyBtn = document.getElementById("copy-ca");
  const dexLink = document.getElementById("dex-link");
  const chartLink = document.getElementById("chart-link");
  const heroBanner = document.querySelector(".hero-banner");

  if (config.bannerImage && heroBanner) {
    heroBanner.src = config.bannerImage;
  }

  if (config.contractAddress && caInput) {
    caInput.value = config.contractAddress;
  }

  if (config.dexUrl && dexLink) {
    dexLink.href = config.dexUrl;
  }

  if (config.chartUrl && chartLink) {
    chartLink.href = config.chartUrl;
  }

  copyBtn?.addEventListener("click", async () => {
    const value = caInput?.value?.trim();
    if (!value || value.startsWith("TBA")) {
      flashButton(copyBtn, "Set CA first");
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      flashButton(copyBtn, "Copied!");
    } catch {
      caInput.select();
      document.execCommand("copy");
      flashButton(copyBtn, "Copied!");
    }
  });

  function flashButton(btn, text) {
    const original = btn.textContent;
    btn.textContent = text;
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 1800);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();
