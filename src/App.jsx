import { useEffect, useState } from "react";
import "./styles.css";

/**
 * IMA-G-IA React wrapper
 *
 * Cette version conserve la logique complète du fichier HTML original,
 * mais la monte dans une application React/Vite prête pour GitHub.
 * Le moteur legacy est chargé après le rendu du DOM pour que les IDs
 * utilisés par l'application soient présents avant l'initialisation.
 */
export default function App() {
  const [engineReady, setEngineReady] = useState(false);

  useEffect(() => {
    let active = true;

    import("./imagia-engine.js")
      .then(() => {
        if (active) setEngineReady(true);
      })
      .catch((error) => {
        console.error("Erreur de chargement IMA-G-IA:", error);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <header className="hdr">
        <div>
          <div className="logo">IMA-G-IA</div>
          <div className="logo-sub" id="logoSub">
            Phase 5 · Presets · Favoris · Historique
          </div>
        </div>
        <div className="hdr-right">
          <div className="hdr-badges" id="hdrBadges" />
          <button
            className="btn btn-ghost btn-sm"
            id="btnLib"
            title="Favoris & historique"
            type="button"
            onClick={() => window.openLibrary?.()}
            disabled={!engineReady}
          >
            ⭐
          </button>
          <button
            className="btn btn-ghost btn-sm"
            id="btnSet"
            title="Paramètres de traduction"
            type="button"
            onClick={() => window.openSettings?.()}
            disabled={!engineReady}
          >
            ⚙️
          </button>
        </div>
      </header>

      <div className="prog-bar">
        <div className="prog-dots" id="progDots" />
        <div className="prog-labels" id="progLabels" />
      </div>

      <main className="layout">
        <div>
          <div className="card" id="stepCard" />
          <div className="mob-prev" id="mobPrev">
            <div className="mob-prev-lbl">Aperçu du prompt</div>
            <div id="mobPrevContent" />
          </div>
        </div>

        <aside className="prev-panel">
          <div className="card">
            <div className="prev-head">
              <span className="prev-label">Aperçu live</span>
              <span className="live-dot" />
            </div>
            <div className="prev-badges" id="prevBadges" />
            <div className="prev-body" id="prevBody" />
          </div>
        </aside>
      </main>

      <button
        className="float-btn"
        id="btnFloat"
        type="button"
        onClick={() => window.goToStep?.(7)}
        disabled={!engineReady}
      >
        ✨ Voir le prompt
      </button>

      <div
        className="modal-overlay"
        id="settingsModal"
        style={{ display: "none" }}
        onClick={(event) => window.closeSettings?.(event.nativeEvent)}
      >
        <div className="modal-box" onClick={(event) => event.stopPropagation()}>
          <div className="modal-head">
            <span className="modal-title" id="setModalTitle">
              ⚙️ Paramètres de traduction
            </span>
            <button
              className="modal-close"
              type="button"
              onClick={() => window.closeSettings?.()}
            >
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="fg">
              <label className="fl" id="lblProvider">
                Fournisseur
              </label>
              <div className="og og-2" style={{ gap: 7 }}>
                <button
                  className="ob sel"
                  id="provDict"
                  type="button"
                  style={{ textAlign: "left", padding: "10px 12px" }}
                  onClick={() => window.selectProvider?.("dictionary")}
                >
                  <div style={{ fontWeight: 600, fontSize: ".82rem" }} id="provDictName">
                    📖 Dictionnaire
                  </div>
                  <div
                    style={{ fontSize: ".68rem", color: "var(--txt3)", marginTop: 2 }}
                    id="provDictSub"
                  >
                    Gratuit · Hors-ligne
                  </div>
                </button>

                <button
                  className="ob"
                  id="provClaude"
                  type="button"
                  style={{ textAlign: "left", padding: "10px 12px" }}
                  onClick={() => window.selectProvider?.("claude")}
                >
                  <div style={{ fontWeight: 600, fontSize: ".82rem" }} id="provClaudeName">
                    🤖 Claude (Anthropic)
                  </div>
                  <div
                    style={{ fontSize: ".68rem", color: "var(--txt3)", marginTop: 2 }}
                    id="provClaudeSub"
                  >
                    Meilleur résultat
                  </div>
                </button>

                <button
                  className="ob"
                  id="provOpenAI"
                  type="button"
                  style={{ textAlign: "left", padding: "10px 12px" }}
                  onClick={() => window.selectProvider?.("openai")}
                >
                  <div style={{ fontWeight: 600, fontSize: ".82rem" }} id="provOpenAIName">
                    🟢 OpenAI GPT
                  </div>
                  <div
                    style={{ fontSize: ".68rem", color: "var(--txt3)", marginTop: 2 }}
                    id="provOpenAISub"
                  >
                    Très bon résultat
                  </div>
                </button>
              </div>
            </div>

            <div className="fg" id="apiKeyField" style={{ display: "none" }}>
              <label className="fl" id="apiKeyLabel" htmlFor="apiKeyInput">
                Clé API
              </label>
              <input
                id="apiKeyInput"
                className="fi"
                type="password"
                placeholder="sk-ant-api03-…"
              />
              <div className="fhint" id="apiKeyHint">
                Obtenu sur console.anthropic.com · Modèle claude-haiku (rapide, économique)
              </div>
            </div>

            <div className="callout callout-info" id="dictInfo">
              Le dictionnaire local couvre FR/ES/RU/AR avec jargon tatouage spécialisé. Aucune clé requise.
            </div>

            <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
              <button
                className="btn btn-primary"
                id="btnSaveSet"
                type="button"
                onClick={() => window.saveSettings?.()}
              >
                Enregistrer
              </button>
              <button
                className="btn btn-ghost"
                id="btnCancelSet"
                type="button"
                onClick={() => window.closeSettings?.()}
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal-overlay"
        id="libModal"
        style={{ display: "none" }}
        onClick={(event) => window.closeLibrary?.(event.nativeEvent)}
      >
        <div
          className="modal-box"
          style={{ maxWidth: 520 }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-head">
            <span className="modal-title" id="libModalTitle">
              ⭐ Bibliothèque — Favoris &amp; Historique
            </span>
            <button
              className="modal-close"
              type="button"
              onClick={() => window.closeLibrary?.()}
            >
              ✕
            </button>
          </div>

          <div className="modal-body">
            <div className="tabs">
              <button
                className="tab-btn active"
                id="libTabFav"
                type="button"
                onClick={() => window.switchLibTab?.("fav")}
              >
                ⭐ Favoris
              </button>
              <button
                className="tab-btn"
                id="libTabHist"
                type="button"
                onClick={() => window.switchLibTab?.("hist")}
              >
                🕒 Historique
              </button>
            </div>
            <div id="libContent" />
          </div>
        </div>
      </div>

      <input
        type="file"
        id="ctxPhotoInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(event) => window.ctxLoadPhoto?.(event)}
      />
    </>
  );
}
