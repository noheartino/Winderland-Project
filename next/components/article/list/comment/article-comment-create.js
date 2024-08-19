import React from "react";

export default function ArticleCommentCreate() {
  return (
    <>
      <div
        className="modal fade"
        id="commentModal"
        tabIndex={-1}
        aria-labelledby="commentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="commentModallLabel">
                新評論
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form>
                {/* <div className="mb-3">
                  <label htmlFor="recipient-name" className="col-form-label">
                    主題:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="recipient-name"
                  />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    在這邊寫點什麼:
                  </label>
                  <textarea
                    className="form-control"
                    id="message-text"
                    defaultValue={""}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                返回
              </button>
              <button type="button" className="btn btn-primary">
                送出
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
