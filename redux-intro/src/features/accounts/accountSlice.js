import { createSlice } from "@reduxjs/toolkit";
//1. Automatically Creates action creators from reducers
//2. Writing reducers becomes easire as we no longer need switch statement, and default state is automatically handled
//3. We can use mutable logic inside reducers as in the background a library "immer" wil convert a mutable logic into an immutable logic

const initialState = {
	balance: 0,
	loan: 0,
	loanPurpose: "",
};

//In these new reducers we don't need to return shit !!
//we just need to mutate whatever we want !
const accountSlice = createSlice({
	name: "account",
	initialState,
	reducers: {
		deposit(state, action) {
			state.balance += action.payload;
		},
		withdraw(state, action) {
			if (state.balance > action.payload) state.balance -= action.payload;
			else state.balance = 0;
		},
		requestLoan: {
			//This is what we need to do if we want out action creator to receive more than one arguments
			prepare(amount, purpose) {
				//Write the arguments
				return {
					//Refactor the payload as an object
					payload: { amount, purpose },
				};
			},

			reducer(state, action) {
				if (state.loan > 0) return;
				// 1. Action creators created automatically by react, by default only accept one single argument(the first oe by default) as action.payload
				//So action.payload .(anything) won't work directly
				//Solution
				//Prepare the data before it reaches the

				// *NOTE *//
				//2. We can also directly pass an object only as one argument
				//as requestLoan({ amount,reason })
				//but if we need it like this requestLoan(amount,reason), then we will need to prepare the payload
				state.loan = action.payload.amount;
				state.loanPurpose = action.payload.purpose;
				state.balance = state.balance + action.payload.amount;
			},
		},
		payLoan(state, action) {
			if (state.balance >= state.loan) {
				state.balance -= state.loan;
				state.loan = 0;
				state.loanPurpose = "";
			} else {
				state.loan -= state.balance;
				state.balance = 0;
			}
		},
	},
});

//Now no need to export deposit action creator manually as it will be exported automatically by redux-toolkit
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

//Managing THUNKS (ASYNC JS)
//This is automatically handled by redux
//Note* this is not the react-toolkit way...of handling thuks
export function deposit(amount, currency) {
	//Keeping the typename by following the same convention is what will tell redux that this is a action creator for deposite
	if (currency === "USD") return { type: "account/deposit", payload: amount };

	return async function (dispatch, getState) {
		//API CALL
		const res = await fetch(
			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
		);
		const data = await res.json();
		const latestAmount = data.rates.USD;
		//Return action
		dispatch({ type: "account/deposit", payload: latestAmount });
	};
}

export default accountSlice.reducer;

//This default passing of initial state is different from use reducer
// export default function accountReducer(state = initialState, action) {
// 	switch (action.type) {
// 		case "account/deposit":
// 			return { ...state, balance: state.balance + action.payload };
// 		case "account/withdraw":
// 			return { ...state, balance: state.balance - action.payload };
// 		case "account/requestLoan":
// 			if (state.loan > 0) return state;
// 			//Later
// 			return {
// 				...state,
// 				loan: action.payload.amount,
// 				loanPurpose: action.payload.purpose,
// 				balance: state.balance + action.payload.amount,
// 			};
// 		case "account/payLoan":
// 			return {
// 				...state,
// 				loan: 0,
// 				loanPurpose: "",
// 				balance: state.balance - state.payload,
// 			};
// 		default:
// 			return state;
// 	}
// }

// export function deposit(amount, currency) {
// 	if (currency === "USD") return { type: "account/deposit", payload: amount };

// 	return async function (dispatch, getState) {
// 		//API CALL
// 		const res = await fetch(
// 			`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
// 		);
// 		const data = await res.json();
// 		const latestAmount = data.rates.USD;
// 		//Return action
// 		dispatch({ type: "account/deposit", payload: latestAmount });
// 	};
// }
// export function withdraw(amount) {
// 	return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(loanAmount, loanPurpose) {
// 	return {
// 		type: "account/requestLoan",
// 		payload: { amount: loanAmount, purpose: loanPurpose },
// 	};
// }
// export function payLoan() {
// 	return { type: "account/payLoan" };
// }
