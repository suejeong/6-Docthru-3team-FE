"use client";

import Container from "@/components/container/PageContainer";
import EditorSection from "./_components/EditorSection";
import DraftModal from "@/components/modal/DraftModal";
import OriginalPageModal from "./_components/OriginalPageModal";
import DraftCheckModal from "./_components/DraftCheckModal";
import OriginalPageModalBtn from "./_components/OriginalPageModalBtn";
import ConfirmActionModal from "@/components/modal/ConfirmActionModal";
import EditorHeader from "./_components/EditorHeader";

import { useParams } from "next/navigation";
import { useDraft } from "@/hooks/work/useDraft";
import { useModalControl } from "@/hooks/work/useModalControl";
import { useWorkData } from "@/hooks/work/useWorkData";

export default function page() {
  const { challengeId, workId } = useParams();

  const { modalState, updateModalState } = useModalControl();
  const { content, setContent, isSubmitted, workMeta, handleUpdateWork, handleDeleteWork } = useWorkData(
    challengeId,
    workId,
    updateModalState
  );
  const { draftState, updateDraftState, toggleDraftModal, saveDraft, loadDraft } = useDraft(workId, setContent);

  return (
    <div className="relative">
      {/* 에디터 */}
      <Container
        maxWidth="max-w-4xl"
        className={
          modalState.isOriginalPageOpen
            ? "mt-[350px] transition-all duration-300 sm:mt-0 sm:mr-[300px] xl:mr-[640px]"
            : ""
        }
      >
        <EditorHeader
          workId={workId}
          challengeTitle={workMeta.challengeTitle}
          content={content}
          onDraft={saveDraft}
          isSubmitted={isSubmitted}
          isSubmitModal={() => updateModalState("isSubmitConfirmOpen", true)}
          onDiscardModal={() => updateModalState("isDeleteConfirmOpen", true)}
        />

        {content ? (
          <EditorSection
            challengeTitle={workMeta.challengeTitle}
            content={content}
            handleContent={setContent}
            onDraft={saveDraft}
            isDrafting={draftState.isDrafting}
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <div className="mx-auto h-[100px] w-full animate-pulse rounded-md bg-gray-100" />
            <div className="mx-auto h-[700px] w-full animate-pulse rounded-md bg-gray-100" />
          </div>
        )}
      </Container>

      {/* 원문 페이지 모달 on/off 버튼 */}
      <OriginalPageModalBtn
        isOriginalPageModal={modalState.isOriginalPageOpen}
        onOpenOriginalPageModal={() => updateModalState("isOriginalPageOpen", !modalState.isOriginalPageOpen)}
      />

      {/* 원문 페이지 모달 */}
      <OriginalPageModal
        originalPageUrl={workMeta.originalUrl}
        onClose={() => updateModalState("isOriginalPageOpen", false)}
        modalState={modalState.isOriginalPageOpen}
      />

      {draftState.hasDraft && (
        <DraftCheckModal setHasDraft={(value) => updateDraftState("hasDraft", value)} onDraftModal={toggleDraftModal} />
      )}

      {draftState.isModalOpen && <DraftModal onClose={toggleDraftModal} isLoggedIn={true} onLoadItem={loadDraft} />}

      {modalState.isDeleteConfirmOpen && (
        <ConfirmActionModal
          text="정말 포기하시겠습니까?"
          onClose={() => updateModalState("isDeleteConfirmOpen", false)}
          onConfirm={handleDeleteWork}
          isLoggedIn={true}
        />
      )}

      {modalState.isSubmitConfirmOpen && (
        <ConfirmActionModal
          text={`${isSubmitted ? "제출" : "수정"}하시겠습니까?`}
          onClose={() => updateModalState("isSubmitConfirmOpen", false)}
          onConfirm={handleUpdateWork}
          isLoggedIn={true}
        />
      )}
    </div>
  );
}
