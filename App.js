import React from "react";
import { StatusBar } from "expo-status-bar";
import HomeScreen from "./screens/Mobile-Banking/HomeScreen";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Auth/Login";
import Registration from "./screens/Auth/Registration";
import OTP from "./screens/Auth/OTP";
import SplashScreen from "./screens/Auth/SplashScreen";
import Sidebar from "./screens/Mobile-Banking/Account-Setting/Sidebar";
import Card from "./screens/Mobile-Banking/Card/Card";
import AccountSetting from "./screens/E-Wallet/Account-Setting/AccountSetting";
import PersonalWallet from "./screens//E-Wallet/Wallet";
import NameChange from "./screens/E-Wallet/Account-Setting/Namechange";
import PasswordChange from "./screens/E-Wallet/Account-Setting/PasswordChange";
import EmailChange from "./screens/E-Wallet/Account-Setting/EmailChange";
import MobNoChange from "./screens/E-Wallet/Account-Setting/Mob_NoChange";
import Nic_DateChange from "./screens/E-Wallet/Account-Setting/Nic_DateChange";
import Language from "./screens/E-Wallet/Account-Setting/Language";
import History from "./screens//E-Wallet/History/History";
import WalletBeneficiary from "./screens/E-Wallet/Select Beneficiary/WalletBeneficiary";
import BankBeneficiary from "./screens/E-Wallet/Select Beneficiary/BankBeneficiary";
import AddBankBeneficiary from "./screens/E-Wallet/Select Beneficiary/Add Beneficiary/AddBankBeneficiary";
import AddWalletBeneficiary from "./screens/E-Wallet/Select Beneficiary/Add Beneficiary/AddWalletBeneficiary";
import SendMoney from "./screens//E-Wallet/Send Money/SendMoney";
import TopUp from "./screens//E-Wallet/Bill & Top-Up/TopUp";
import "react-native-gesture-handler";
import Receive from "./screens/E-Wallet/Recieve/Receive";
import Scanner from "./components/QR/Scanner";
import EntitySelection from "./components/EntitySelection";
import BillPaymentListing from "./screens/E-Wallet/Bill & Top-Up/BillPaymentListing";
import BillPaymentTopUp from "./screens/E-Wallet/Bill & Top-Up/BillPaymentTopUp";
import Domestic from "./screens/E-Wallet/Send Money/Domestic";
import MyPayess from "./screens/E-Wallet/Send Money/MyPayess";
import NewAccountAdd from "./screens/E-Wallet/Send Money/NewAccountAdd";
import Transfer from "./screens/E-Wallet/Send Money/Transfer";
import { LoaderHOC } from "./components/LoaderHOC";
import ForgetPassword from "./screens/Auth/ForgetPassword";
import NewPassword from "./screens/Auth/NewPassword";
import MyQRCode from "./components/QR/MyQrCode";
import Footer from "./components/Footer";
import OTPverification from "./components/OTPverification";
import ApplyForCard from "./screens/Mobile-Banking/My-Cards/ApplyForCard";
import NameOnTheCard from "./screens/Mobile-Banking/My-Cards/NameOnTheCard";
import ApplyCard from "./screens/Mobile-Banking/My-Cards/ApplyCard";
import CardManagement from "./screens/Mobile-Banking/My-Cards/Card-Management";
import CongCard from "./screens/Mobile-Banking/My-Cards/CongCard";
import NewCard from "./screens/Mobile-Banking/My-Cards/NewCard";
import SelectCards from "./screens/Mobile-Banking/My-Cards/SelectCards";
import SelectApplyOptionCard from "./screens/Mobile-Banking/My-Cards/SelectApplyOptionCard";
import SupplementaryCard from "./screens/Mobile-Banking/My-Cards/SupplementaryCard";
import SupplementaryCardCustomization from "./screens/Mobile-Banking/My-Cards/SupplementaryCardCustomization";
import SupplementaryCardLimitSplit from "./screens/Mobile-Banking/My-Cards/SupplementaryCardLimitSplit";
import CashUpCard from "./screens/Mobile-Banking/My-Cards/CashUpCard";
import CardActivation from "./screens/Mobile-Banking/My-Cards/CardActivation";
import SetCardPin from "./screens/Mobile-Banking/My-Cards/SetCardPin";
import CardActivated from "./screens/Mobile-Banking/My-Cards/CardActivated";
import ForgetUserName from "./screens/Auth/ForgetUserName";
import StartSection from "./screens/Auth/StartSection";
import SendBeneficiaryMoney from "./screens/Mobile-Banking/Beneficiary/SendBeneficiaryMoney";
import Add_Beneficiary from "./screens/Mobile-Banking/Beneficiary/Add-Beneficiary";
import AvailCashonCreditCard  from "./screens/Mobile-Banking/Easy-Cash/AvailCashonCreditCard"; 
import BeneficiaryAccountDetails  from "./screens/Mobile-Banking/Easy-Cash/BeneficiaryAccountDetails"; 
import Summary from "./screens/Mobile-Banking/Easy-Cash/Summary";
import SendFromAccount from "./screens/Mobile-Banking/Beneficiary/SendFromAccount";
import PayNow from "./screens/Mobile-Banking/Beneficiary/PayNow";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    InterBlack: require("./assets/fonts/Inter-Black.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });

  const Auth = () => {
    return (
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen
          name="StartScreen"
          component={StartSection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetPassword"
          component={ForgetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgetUserName"
          component={ForgetUserName}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP"
          component={OTP}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EntitySelection"
          component={EntitySelection}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Sidebar"
          component={Sidebar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Card"
          component={Card}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplyForCard"
          component={ApplyForCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CardActivation"
          component={CardActivation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NameOnTheCard"
          component={NameOnTheCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ApplyCard"
          component={ApplyCard}
          options={{ headerShown: false }}
        />

        {/* Easy-Cash Module */}
        <Stack.Screen
          name="AvailCashonCreditCard"
          component={AvailCashonCreditCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BeneficiaryAccountDetails"
          component={BeneficiaryAccountDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{ headerShown: false }}
        />
        {/* Easy-Cash Module end */}

         {/* Beneficiary Module  */}
        <Stack.Screen
          name="SendFromAccount"
          component={SendFromAccount}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add_Beneficiary"
          component={Add_Beneficiary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendBeneficiaryMoney"
          component={SendBeneficiaryMoney}
          options={{ headerShown: false }}
        />
         <Stack.Screen
          name="PayNow"
          component={PayNow}
          options={{ headerShown: false }}
        />
        {/* Beneficiary Module end */}
        <Stack.Screen
          name="CardManagement"
          component={CardManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CashUpCard"
          component={CashUpCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CongCard"
          component={CongCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectApplyOptionCard"
          component={SelectApplyOptionCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SupplementaryCard"
          component={SupplementaryCard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SupplementaryCardCustomization"
          component={SupplementaryCardCustomization}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CardActivated"
          component={CardActivated}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountSetting"
          component={AccountSetting}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Wallet"
          component={PersonalWallet}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NameChange"
          component={NameChange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendMoney"
          component={SendMoney}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Domestic"
          component={Domestic}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyPayees"
          component={MyPayess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewAccountAdd"
          component={NewAccountAdd}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Transfer"
          component={Transfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EmailChange"
          component={EmailChange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PasswordChange"
          component={PasswordChange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MobNoChange"
          component={MobNoChange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nic_DateChange"
          component={Nic_DateChange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WalletBeneficiary"
          component={WalletBeneficiary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BankBeneficiary"
          component={BankBeneficiary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddWalletBeneficiary"
          component={AddWalletBeneficiary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddBankBeneficiary"
          component={AddBankBeneficiary}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="SelectTopUp"
          component={SelectTopUp}
          /> */}
        <Stack.Screen
          name="Receive"
          component={Receive}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Scanner"
          component={Scanner}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MyQRCode"
          component={MyQRCode}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="TopUp"
          component={TopUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BillPaymentListing"
          component={BillPaymentListing}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BillPaymentTopUp"
          component={BillPaymentTopUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Footer"
          component={Footer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPverification"
          component={OTPverification}
          options={{ headerShown: false }}
        />
        
        
      </Stack.Navigator>
      
    );
  };

  return (
    loaded && (
      <NavigationContainer>
        <LoaderHOC>
          <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
             <Stack.Screen
                name="Add_Beneficiary"
                component={Add_Beneficiary}
                options={{ headerShown: false }}
              />

            <Stack.Screen
              name="Auth"
              component={Auth}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EntitySelection"
              component={EntitySelection}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ForgetUserName"
              component={ForgetUserName}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPassword}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sidebar"
              component={Sidebar}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="AccountSetting"
              component={AccountSetting}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Language"
              component={Language}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="NameChange"
              component={NameChange}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="PasswordChange"
              component={PasswordChange}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="EmailChange"
              component={EmailChange}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Nic_DateChange"
              component={Nic_DateChange}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MobNoChange"
              component={MobNoChange}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="History"
              component={History}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WalletBeneficiary"
              component={WalletBeneficiary}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BankBeneficiary"
              component={BankBeneficiary}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Domestic"
              component={Domestic}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyPayess"
              component={MyPayess}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewAccountAdd"
              component={NewAccountAdd}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Transfer"
              component={Transfer}
              options={{ headerShown: false }}
            />
            {/* <Stack.Screen
          name="SelectTopUp"
          component={SelectTopUp}
          options={{ headerShown: false }}
        /> */}
            <Stack.Screen
              name="TopUp"
              component={TopUp}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="Receive"
              component={Receive}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NewCard"
              component={NewCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectCards"
              component={SelectCards}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CashUpCard"
              component={CashUpCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CongCard"
              component={CongCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ApplyCard"
              component={ApplyCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CardManagement"
              component={CardManagement}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="SelectApplyOptionCard"
              component={SelectApplyOptionCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SupplementaryCard"
              component={SupplementaryCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SupplementaryCardCustomization"
              component={SupplementaryCardCustomization}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SupplementaryCardLimitSplit"
              component={SupplementaryCardLimitSplit}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Scanner"
              component={Scanner}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="MyQRCode"
              component={MyQRCode}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BillPaymentListing"
              component={BillPaymentListing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="BillPaymentTopUp"
              component={BillPaymentTopUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OTPverification"
              component={OTPverification}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Footer"
              component={Footer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ApplyForCard"
              component={ApplyForCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="NameOnTheCard"
              component={NameOnTheCard}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CardActivation"
              component={CardActivation}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SetCardPin"
              component={SetCardPin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="CardActivated"
              component={CardActivated}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </LoaderHOC>
      </NavigationContainer>
    )
  );
}
