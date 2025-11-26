function getGuestIdFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadGuest() {
  const nameEl = document.getElementById("guest-name");
  const msgEl = document.getElementById("message");

  const id = getGuestIdFromQuery();
  if (!id) {
    nameEl.textContent = "ゲスト様へ";
    msgEl.textContent = "URLに「id」が指定されていません。QRコードの設定をもう一度ご確認ください。";
    msgEl.classList.add("error");
    return;
  }

  try {
    const res = await fetch("guests.json", { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed to load guests.json");
    const guests = await res.json();
    const guest = guests[id];

    if (!guest) {
      nameEl.textContent = "ゲスト様へ";
      msgEl.textContent = "このページのメッセージが見つかりませんでした。お手数ですが新郎新婦までお声がけください。";
      msgEl.classList.add("error");
      return;
    }

    nameEl.textContent = guest.name + " 様へ";
    msgEl.textContent = guest.message;
  } catch (err) {
    console.error(err);
    nameEl.textContent = "ゲスト様へ";
    msgEl.textContent = "メッセージの読み込み中にエラーが発生しました。少し時間をおいて再度お試しください。";
    msgEl.classList.add("error");
  }
}

document.addEventListener("DOMContentLoaded", loadGuest);
