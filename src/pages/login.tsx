import GradientBg from "@/components/page/login/gradient-bg";
import LoginForm from "@/components/page/login/login-form";
import { Alert } from "antd";
import { Verified } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen bg-white items-centerw-full">
      <div className={`relative hidden w-1/2 lg:block`}>
        <GradientBg className="absolute top-0 left-0 w-full h-full" />
        <img src="/img/logo/logo_removedBackground.png" className="absolute w-10 h-10 top-5 left-5" alt="logo" />
        <div className="absolute inline-flex items-center gap-1 px-3 py-2 font-semibold text-white border-2 border-white rounded-lg left-5 bottom-5">
          <Verified width={18} height={18} />
          Pro Worker
        </div>
      </div>

      <div className="w-full lg:w-1/2">
        <div className="relative flex items-center justify-center h-full">
          <section className="w-full px-5 pb-10 text-gray-800 sm:w-4/6 md:w-3/6 lg:w-4/6 xl:w-3/6 sm:px-0">
            <div className="flex flex-col items-center justify-center px-2 mt-8 sm:mt-0">
              <h2 className="mt-2 text-5xl font-bold leading-tight inter">AI Shorts Maker</h2>
              <div className="mt-1 text-lg text-gray-400">숏츠를 만드는 새로운 방법!</div>
            </div>

            <div className="w-full px-2 mt-12 sm:px-6">
              <LoginForm />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
