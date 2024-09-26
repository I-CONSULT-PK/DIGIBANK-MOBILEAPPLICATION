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
import BeneficiaryList from "./screens/Mobile-Banking/Beneficiary/BeneficiaryList";
import Add_Beneficiary from "./screens/Mobile-Banking/Beneficiary/Add-Beneficiary";
import AvailCashonCreditCard from "./screens/Mobile-Banking/Easy-Cash/AvailCashonCreditCard";
import BeneficiaryAccountDetails from "./screens/Mobile-Banking/Easy-Cash/BeneficiaryAccountDetails";
import Summary from "./screens/Mobile-Banking/Easy-Cash/Summary";
import SendFromAccount from "./screens/Mobile-Banking/Beneficiary/SendFromAccount";
import PayNow from "./screens/Mobile-Banking/Beneficiary/PayNow";
import BankList from "./screens/Mobile-Banking/Beneficiary/BankList";
import Fatch_Acc_Beneficiary from "./screens/Mobile-Banking/Beneficiary/Fatch_Acc_Beneficiary";
import ChooseSecurity from "./screens/Auth/ChooseSecurity";
import RegisterFingerPrint from "./screens/Auth/RegisterFingerPrint";
import RegisterFaceDetector from "./screens/Auth/RegisterFaceDetector";
import Account_Statements from "./screens/Mobile-Banking/Account-Setting/Account_Statements";
import SelectLanguage from "./screens/Mobile-Banking/Account-Setting/SelectLanguage";
import OTP_Preference from "./screens/Mobile-Banking/Account-Setting/OTP_Preference";
import Account_Setting_List from "./screens/Mobile-Banking/Account-Setting/Account_Setting_List";
import LimitManagement from "./screens/Mobile-Banking/Account-Setting/LimitManagement";
import Bill_Payment_List from "./screens/Mobile-Banking/Bill-Payments/Bill_Payment_List";
import Bill_Payment_Transfer from "./screens/Mobile-Banking/Bill-Payments/Bill_Payment_Transfer";
import Fatch_Payment_Details from "./screens/Mobile-Banking/Bill-Payments/Fatch_Payment_Details";
import Net_Bill_Pyament_List from "./screens/Mobile-Banking/Bill-Payments/Net_Bill_Pyament_List";
import Set_Payment from "./screens/Mobile-Banking/Bill-Payments/Set_Payment";
import Card_Payment_List from "./screens/Mobile-Banking/Credit-Card-Payments/Card_Payment_List";
import Fatch_Bank_Details from "./screens/Mobile-Banking/Credit-Card-Payments/Fatch_Bank_Details";
import Set_Card_Payment from "./screens/Mobile-Banking/Credit-Card-Payments/Set_Card_Payment";
import Card_Payment_Transfer from "./screens/Mobile-Banking/Credit-Card-Payments/Card_Payment_Transfer";
import Fatch_Other_Bank_Details from "./screens/Mobile-Banking/Credit-Card-Payments/Fatch_Other_Bank_Details";
import Top_up_List from "./screens/Mobile-Banking/Mobile-Top-Up/Top-up-List";
import Add_Biller from "./screens/Mobile-Banking/Mobile-Top-Up/Add_Biller";
import SelectOption_Top_up from "./screens/Mobile-Banking/Mobile-Top-Up/SelectOption_Top_up";
import Packages from "./screens/Mobile-Banking/Mobile-Top-Up/Packages";
import Enter_No_Top_up from "./screens/Mobile-Banking/Mobile-Top-Up/Enter_No_Top_up";
import Fatch_Details from "./screens/Mobile-Banking/Mobile-Top-Up/Fatch_Details";
import To_Up_Transfer from "./screens/Mobile-Banking/Mobile-Top-Up/To_Up_Transfer";
import Account from "./screens/Mobile-Banking/Account/Account";
import Update_Profile from "./screens/Mobile-Banking/Account-Setting/Update_Profile";
import Add_Account from "./screens/Mobile-Banking/Account-Setting/Add_Account";
import Fatch_amount_Packges from "./screens/Mobile-Banking/Mobile-Top-Up/Fatch_amount_Packges";
import Packges_Transfer from "./screens/Mobile-Banking/Mobile-Top-Up/Packges_Transfer";
const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    InterBlack: require("./assets/fonts/Inter-Black.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
  });
  if (!loaded) {
    return null; // Or a splash screen
  }

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
        <Stack.Screen
          name="Add_Account"
          component={Add_Account}
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
        {/* Account Settings start */}
        <Stack.Screen
          name="Bill_Payment_List"
          component={Bill_Payment_List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Bill_Payment_Transfer"
          component={Bill_Payment_Transfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fatch_Payment_Details"
          component={Fatch_Payment_Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Net_Bill_Pyament_List"
          component={Net_Bill_Pyament_List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Set_Payment"
          component={Set_Payment}
          options={{ headerShown: false }}
        />

        {/* Account Settings start */}

        <Stack.Screen
          name="Card_Payment_List"
          component={Card_Payment_List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fatch_Bank_Details"
          component={Fatch_Bank_Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Set_Card_Payment"
          component={Set_Card_Payment}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Card_Payment_Transfer"
          component={Card_Payment_Transfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fatch_Other_Bank_Details"
          component={Fatch_Other_Bank_Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Top_up_List"
          component={Top_up_List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Enter_No_Top_up"
          component={Enter_No_Top_up}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Add_Biller"
          component={Add_Biller}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectOption_Top_up"
          component={SelectOption_Top_up}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Mobile_Packages"
          component={Packages}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="To_Up_Transfer"
          component={To_Up_Transfer}
          options={{ headerShown: false }}
        />
        {/* Account Settings end */}

        <Stack.Screen
          name="LimitManagement"
          component={LimitManagement}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fatch_Details_Top_up"
          component={Fatch_Details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account_Balance"
          component={Account}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Update_Profile"
          component={Update_Profile}
          options={{ headerShown: false }}
        />
        {/* Account Settings end */}
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
          name="Fatch_amount_Packges"
          component={Fatch_amount_Packges}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Packges_Transfer"
          component={Packges_Transfer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Nic_DateChange"
          component={Nic_DateChange}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTP_Preference"
          component={OTP_Preference}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account_Setting_List"
          component={Account_Setting_List}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="History"
          component={History}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Account_Statements"
          component={Account_Statements}
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

        <Stack.Screen
          name="BeneficiaryList"
          component={BeneficiaryList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BankList"
          component={BankList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseSecurity"
          component={ChooseSecurity}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterFingerPrint"
          component={RegisterFingerPrint}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterFaceDetector"
          component={RegisterFaceDetector}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Fatch_Acc_Beneficiary"
          component={Fatch_Acc_Beneficiary}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SelectLanguage"
          component={SelectLanguage}
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
              name="Fatch_Acc_Beneficiary"
              component={Fatch_Acc_Beneficiary}
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
              name="OTP_Preference"
              component={OTP_Preference}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Account_Setting_List"
              component={Account_Setting_List}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ChooseSecurity"
              component={ChooseSecurity}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterFingerPrint"
              component={RegisterFingerPrint}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterFaceDetector"
              component={RegisterFaceDetector}
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
              name="Language"
              component={Language}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bill_Payment_List"
              component={Bill_Payment_List}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Bill_Payment_Transfer"
              component={Bill_Payment_Transfer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Fatch_Payment_Details"
              component={Fatch_Payment_Details}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Net_Bill_Pyament_List"
              component={Net_Bill_Pyament_List}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Set_Payment"
              component={Set_Payment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Card_Payment_List"
              component={Card_Payment_List}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Fatch_Bank_Details"
              component={Fatch_Bank_Details}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Set_Card_Payment"
              component={Set_Card_Payment}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Card_Payment_Transfer"
              component={Card_Payment_Transfer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Fatch_Other_Bank_Details"
              component={Fatch_Other_Bank_Details}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Top_up_List"
              component={Top_up_List}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add_Biller"
              component={Add_Biller}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SelectOption_Top_up"
              component={SelectOption_Top_up}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Update_Profile"
              component={Update_Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Add_Account"
              component={Add_Account}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Fatch_amount_Packges"
              component={Fatch_amount_Packges}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Mobile_Packages"
              component={Packages}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Enter_No_Top_up"
              component={Enter_No_Top_up}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Fatch_Details_Top_up"
              component={Fatch_Details}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="To_Up_Transfer"
              component={To_Up_Transfer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Packges_Transfer"
              component={Packges_Transfer}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Account_Balance"
              component={Account}
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
              name="Account_Statements"
              component={Account_Statements}
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
