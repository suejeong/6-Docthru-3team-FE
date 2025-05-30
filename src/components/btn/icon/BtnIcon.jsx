import visibleOffEye from "@/assets/btn/btn_visibility_off.svg";
import visibleOnEye from "@/assets/btn/btn_visibility_on.svg"
import Image from "next/image";

export default function IconPasswordVisible ({on}) {
    return (
        <button>
            { on ?
                (<Image src ={visibleOnEye} alt="비밀번호 보이기" width={20} height={20} />) :
                (<Image src ={visibleOffEye} alt="비밀번호 안보이기" width={20} height={20}  />)
            }
        </button>
    )
}