/*if (document.baseURI.includes('/checkouts/')) {
  const params = (new URL(document.location)).searchParams;
  const transactionId = (new URL(document.location)).searchParams.get('transactionId');
  // check transactionId is exsit or not into url
  if (transactionId) {
    const accessToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImUxNDk5MTYxLWJlZDEtNGE1YS04NzRkLWMxMjAzYzU4ZGQ5NyJ9.eyJlbWFpbCI6InBldGhhbmloYXJkaWsuaGFyZGlrNjNAZ21haWwuY29tIiwiYWNjb3VudElkIjoiMzVjZmM1NjYtZGU3Zi00YmYyLWIzOWYtYzgyMzRiNWU0NTQ0IiwiZ3R5IjoicGFzc3dvcmQiLCJzY29wZSI6ImRlZmF1bHQiLCJpYXQiOjE3MDcxNTY3NjIsImV4cCI6MjU1MTA5NDU3NTYxLCJpc3MiOiJhcGkuaGVsbG9leHRlbmQuY29tIiwic3ViIjoiZGE0NTNkZWUtZTNmZS00YzJmLWE4YTYtZDVkZWE2OWFkNzBlIiwianRpIjoiQmoyS1hkamdycEU4MnNZMUdlQikifQ.bC_01NWTNNg1ytEbM7KURQtMuDmZ3p7m-mlcO74fClvmLVs0jZicVTAjuMgekNmvGOaonhqivQQcK7pHj3BYPg';
    const storeId = 'a51df5f4-70a1-4840-bdd4-e4a8ed0e4ae5';
    const api = `https://api.helloextend.com/orders/search?transactionId=${transactionId}`;

    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Extend-Access-Token': accessToken,
        Accept: 'application/json; version=2022-02-01'
      }
    };
    fetch(api, options)
      .then(response => response.json())
      .then(response => {
          const latestOrder = (response.orders.sort((a, b) => b.createdAt - a.createdAt))[0]
          // set value into form using below code
          document.getElementById('checkout_email').value = latestOrder.customer.email;
          document.getElementById('checkout_billing_address_first_name').value = (latestOrder.customer.name.split(' '))[0];
          document.getElementById('checkout_billing_address_last_name').value = (latestOrder.customer.name.split(' '))[1];
          document.getElementById('checkout_billing_address_address1').value = latestOrder.customer.billingAddress.address1;
          document.getElementById('checkout_billing_address_city').value = latestOrder.customer.billingAddress.city;
          document.getElementById('checkout_billing_address_zip').value = latestOrder.customer.billingAddress.postalCode;
          const selectCountry = document.getElementById('checkout_billing_address_country');
          const selectState = document.getElementById('checkout_billing_address_country');
          // set for country
          for (let index = 0; index < selectCountry.options.length; index++) {
            const optionValue = selectCountry.options[index]
            if (optionValue.getAttribute("data-code") === latestOrder.customer.billingAddress.countryCode) {
              // optionValue.setAttribute('selected', true);
              // $("#checkout_billing_address_country").on('change',function(){
                document.getElementById("checkout_billing_address_country").value = optionValue.value;
                document.getElementById("checkout_billing_address_province").value = latestOrder.customer.billingAddress.province;
              // });
            }
          }
          // set for state
          // for (let index = 0; index < selectState.options.length; index++) {
          //   const optionValue = selectState.options[index]
          //   if (optionValue.getAttribute("data-code") === latestOrder.customer.billingAddress.countryCode) {
          //     optionValue.setAttribute('selected', true);
          //   }
          // }
        })
        .catch(err => console.log('error==>',err));
  }
}

if (document.location.pathname === '/pages/register') {
  const transactionId = (new URL(document.location)).searchParams.get('transactionId');
  // check transactionId is exsit or not into url
  if (transactionId) {
    const accessToken = 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImUxNDk5MTYxLWJlZDEtNGE1YS04NzRkLWMxMjAzYzU4ZGQ5NyJ9.eyJlbWFpbCI6InBldGhhbmloYXJkaWsuaGFyZGlrNjNAZ21haWwuY29tIiwiYWNjb3VudElkIjoiMzVjZmM1NjYtZGU3Zi00YmYyLWIzOWYtYzgyMzRiNWU0NTQ0IiwiZ3R5IjoicGFzc3dvcmQiLCJzY29wZSI6ImRlZmF1bHQiLCJpYXQiOjE3MDcxNTY3NjIsImV4cCI6MjU1MTA5NDU3NTYxLCJpc3MiOiJhcGkuaGVsbG9leHRlbmQuY29tIiwic3ViIjoiZGE0NTNkZWUtZTNmZS00YzJmLWE4YTYtZDVkZWE2OWFkNzBlIiwianRpIjoiQmoyS1hkamdycEU4MnNZMUdlQikifQ.bC_01NWTNNg1ytEbM7KURQtMuDmZ3p7m-mlcO74fClvmLVs0jZicVTAjuMgekNmvGOaonhqivQQcK7pHj3BYPg';
    const storeId = 'a51df5f4-70a1-4840-bdd4-e4a8ed0e4ae5';
    const api = `https://api.helloextend.com/orders/search?transactionId=${transactionId}`;

    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Extend-Access-Token': accessToken,
          Accept: 'application/json; version=2022-02-01'
        }
      };
      fetch(api, options)
        .then(response => response.json())
        .then(response => {
          const latestOrder = (response.orders.sort((a, b) => b.createdAt - a.createdAt))[0]
          // open register form using below code
          let _klOnsite =  window._klOnsite || []; 
          _klOnsite.push(['openForm', 'Sa2zcc']);
          const orderData = {
            first_name : (latestOrder.customer.name.split(' '))[0],
            last_name : (latestOrder.customer.name.split(' '))[1],
            email : latestOrder.customer.email,
            date_purchased : `${(new Date(latestOrder.createdAt).toLocaleDateString()).split('/')[1]}/${(new Date(latestOrder.createdAt).toLocaleDateString()).split('/')[0]}`
          };
          console.log(orderData);
          waitForDataLoad(orderData, function(){
              console.log("value is loaded..");
          });
        })
        .catch(err => console.log('error==>',err));
    
      function waitForDataLoad(orderData, callback){
        var poops = setInterval(function(){
            if(document.querySelector('.klaviyo-form')){
              document.getElementById('first_name_85575908').value = orderData.first_name;
              document.getElementById('last_name_85575909').setAttribute("value", orderData.last_name);
              document.getElementById('last_name_85575909').value = orderData.last_name;
              document.getElementById('email_85575911').value = orderData.email;
              document.getElementById('_85575914').value = orderData.date_purchased;
              
              clearInterval(poops);
              callback();
            }
        }, 2000);
      }
      
  }
}*/



// console.log('sdfsdf');

// store constant variable into below function
function getConstantParams() {
  return {
    accessToken:
      "eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImUxNDk5MTYxLWJlZDEtNGE1YS04NzRkLWMxMjAzYzU4ZGQ5NyJ9.eyJlbWFpbCI6InBldGhhbmloYXJkaWsuaGFyZGlrNjNAZ21haWwuY29tIiwiYWNjb3VudElkIjoiMzVjZmM1NjYtZGU3Zi00YmYyLWIzOWYtYzgyMzRiNWU0NTQ0IiwiZ3R5IjoicGFzc3dvcmQiLCJzY29wZSI6ImRlZmF1bHQiLCJpYXQiOjE3MDcxNTY3NjIsImV4cCI6MjU1MTA5NDU3NTYxLCJpc3MiOiJhcGkuaGVsbG9leHRlbmQuY29tIiwic3ViIjoiZGE0NTNkZWUtZTNmZS00YzJmLWE4YTYtZDVkZWE2OWFkNzBlIiwianRpIjoiQmoyS1hkamdycEU4MnNZMUdlQikifQ.bC_01NWTNNg1ytEbM7KURQtMuDmZ3p7m-mlcO74fClvmLVs0jZicVTAjuMgekNmvGOaonhqivQQcK7pHj3BYPg",
    storeId: "a51df5f4-70a1-4840-bdd4-e4a8ed0e4ae5",
    is_warranty_test: false,
  };
}

/**
 * this code use for checkout page
 */
if (document.baseURI.includes("/checkouts/")) {
  const params = new URL(document.location).searchParams;
  const transactionId = new URL(document.location).searchParams.get(
    "transactionId"
  );
  // check transactionId is exsit or not into url
  if (transactionId) {
    const accessToken = getConstantParams().accessToken;
    const storeId = getConstantParams().storeId;
    const api = `https://api.helloextend.com/orders/search?transactionId=${transactionId}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Extend-Access-Token": accessToken,
        Accept: "application/json; version=2022-02-01",
      },
    };
    fetch(api, options)
      .then((response) => response.json())
      .then((response) => {
        const latestOrder = response.orders.sort(
          (a, b) => b.createdAt - a.createdAt
        )[0];
        // console.log(latestOrder);
        // set value into form using below code
        document.getElementById("checkout_email").value =
          latestOrder.customer.email;
        document.getElementById("checkout_billing_address_first_name").value =
          latestOrder.customer.name.split(" ")[0];
        document.getElementById("checkout_billing_address_last_name").value =
          latestOrder.customer.name.split(" ")[1];
        document.getElementById("checkout_billing_address_address1").value =
          latestOrder.customer.billingAddress?.address1 === undefine
            ? ""
            : latestOrder.customer.billingAddress?.address1;
        document.getElementById("checkout_billing_address_city").value =
          latestOrder.customer.billingAddress?.city === undefine
            ? ""
            : latestOrder.customer.billingAddress?.city;
        document.getElementById("checkout_billing_address_zip").value =
          latestOrder.customer.billingAddress?.postalCode === undefine
            ? ""
            : latestOrder.customer.billingAddress?.postalCode;
        const selectCountry = document.getElementById(
          "checkout_billing_address_country"
        );
        const selectState = document.getElementById(
          "checkout_billing_address_country"
        );
        // set for country
        for (let index = 0; index < selectCountry.options.length; index++) {
          const optionValue = selectCountry.options[index];
          if (
            optionValue.getAttribute("data-code") ===
            latestOrder.customer.billingAddress?.countryCode
          ) {
            // optionValue.setAttribute('selected', true);
            // $("#checkout_billing_address_country").on('change',function(){
            document.getElementById("checkout_billing_address_country").value =
              optionValue.value;
            document.getElementById("checkout_billing_address_province").value =
              latestOrder.customer.billingAddress?.province;
            // });
          }
        }
        // set for state
        // for (let index = 0; index < selectState.options.length; index++) {
        //   const optionValue = selectState.options[index]
        //   if (optionValue.getAttribute("data-code") === latestOrder.customer.billingAddress.countryCode) {
        //     optionValue.setAttribute('selected', true);
        //   }
        // }
      })
      .catch((err) => console.log("error==>", err));
  }
}

/**
 * this code use for register warranty page
 */
if (
  window.location.pathname === "/pages/register" ||
  window.location.pathname === "/pages/extend-protection-plan"
) {
  const transactionId = new URL(document.location).searchParams.get(
    "transactionId"
  );
  if (transactionId) {
    // document.getElementById("spinner_1").style.display = "block";
  }
  // check transactionId is exsit or not into url
  /* if (transactionId) {
    const accessToken = getConstantParams().accessToken;
    const storeId = getConstantParams().storeId;
    const api = `https://api.helloextend.com/orders/search?transactionId=${transactionId}`;

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Extend-Access-Token": accessToken,
        Accept: "application/json; version=2022-02-01",
      },
    };
    fetch(api, options)
      .then((response) => response.json())
      .then((response) => {
        const latestOrder = response.orders.sort(
          (a, b) => b.createdAt - a.createdAt
        )[0];
        // console.log(latestOrder);
        // open register form using below code
        // let _klOnsite =  window._klOnsite || [];
        // _klOnsite.push(['openForm', 'Sa2zcc']);
        const orderData = {
          first_name: latestOrder.customer.name.split(" ")[0],
          last_name: latestOrder.customer.name.split(" ")[1],
          email: latestOrder.customer.email,
          date_purchased: `${
            new Date(latestOrder.createdAt).toLocaleDateString().split("/")[1]
          }/${
            new Date(latestOrder.createdAt).toLocaleDateString().split("/")[0]
          }`,
          shipping_city: latestOrder.customer.shippingAddress.city,
          billing_city: latestOrder.customer.billingAddress.city,
          isTest: latestOrder.isTest,
        };
        // console.log(orderData);
        waitForDataLoad(orderData, function (err, res) {
          if (err) {
            return false;
          }
          console.log("value is loaded..");
        });
      })
      .catch((err) => console.log("error==>", err));

    function waitForDataLoad(orderData, callback) {
      var poops = setInterval(function () {
        if (document.getElementById("register_extend_warranty")) {
          document.getElementById("order_data").value =
            JSON.stringify(orderData);
          document.getElementById("first_name_85575908").value =
            orderData.first_name;
          // document.getElementById('last_name_85575909').setAttribute("value", orderData.last_name);
          document.getElementById("last_name_85575909").value =
            orderData.last_name;
          document.getElementById("email_85575911").value = orderData.email;
          document.getElementById("date_purchased_85575914").value =
            orderData.date_purchased;

          clearInterval(poops);
          callback();
        } else {
          callback(true);
        }
      }, 2000);
    }
  } */

  // this function use for crete new warranty order
  function applyForWarranty(data, callback) {
    let payload = {
      currency: "USD",
      createdAt: new Date().getTime(),
      customer: {
        billingAddress: {
          city: data.billing_city,
        },
        shippingAddress: {
          city: data.billing_city,
        },
        email: data.email,
        name: data.first_name + " " + data.last_name,
      },
      lineItems: [
        {
          lineItemTransactionId: uuid.v4(),
          product: {
            id: data.product_id,
            purchasePrice: 34,
            name: data.product_name,
            identifiers: { barcode: data.serial_number },
          },
          fulfilledAt: new Date().getTime(),
          quantity: 1,
          status: "fulfilled",
        },
      ],
      isTest: getConstantParams().is_warranty_test,
      productCostTotal: data.product_price,
      storeId: getConstantParams().storeId,
      storeName: "Blue Tees Golf",
      transactionId: uuid.v4(),
    };

    var config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json; version=2022-02-01",
        "X-Extend-Access-Token": getConstantParams().accessToken,
        "X-Idempotency-Key": uuid.v4(), // Generate a version 4 UUID
      },
      body: JSON.stringify(payload),
    };

    fetch("https://api.helloextend.com/orders", config)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data=====>", data);
        callback(null, data);
      })
      .catch((error) => {
        console.log("error=====>", error);
        callback(error);
      });
  }

  /**
   * this code use for submit warranty data on extand
   */

  $(".required_input").on("change keydown paste input", function () {
    //const inputFieldschange = this.value;
    const fieldmain = this;
    let isError = false;
    document.getElementById("error-message").style.display = "none";
    if (fieldmain.value.trim().length <= 0) {
      // The input field is invalid
      fieldmain.nextElementSibling.style.display = "block";
      fieldmain.nextElementSibling.innerHTML =
        "Please fill the required filed.";
    } else if (
      fieldmain.id === "email_85575911" &&
      !validateEmail(fieldmain.value.trim())
    ) {
      fieldmain.nextElementSibling.style.display = "block";
      fieldmain.nextElementSibling.innerHTML = "Please enter valid email.";
    } else {
      fieldmain.nextElementSibling.innerHTML = "";
      fieldmain.nextElementSibling.style.display = "none";
    }
  });

  function submitWarrantyData() {
    const inputFields = document.querySelectorAll(".required_input");
    let isError = false;
    inputFields.forEach(function (inputField) {
      if (inputField.value.trim().length <= 0) {
        // The input field is invalid
        inputField.nextElementSibling.style.display = "block";
        inputField.nextElementSibling.innerHTML =
          "Please fill the required filed.";
        isError = true;
        return false;
      } else if (
        inputField.id === "email_85575911" &&
        !validateEmail(inputField.value.trim())
      ) {
        inputField.nextElementSibling.style.display = "block";
        inputField.nextElementSibling.innerHTML = "Please enter valid email.";
        isError = true;
        return false;
      } else {
        inputField.nextElementSibling.innerHTML = "";
        inputField.nextElementSibling.style.display = "none";
      }
    });

    if (isError) {
      return false;
    }
    document.getElementById("spinner").style.display = "block";
    // const order_data = JSON.parse(document.getElementById("order_data").value);
    const first_name = document.getElementById("first_name_85575908").value;
    const last_name = document.getElementById("last_name_85575909").value;
    const email = document.getElementById("email_85575911").value;
    const date_purchased = document.getElementById(
      "date_purchased_85575914"
    ).value;
    const PurchaseLocation = document.getElementById(
      "purchased_location_5575913"
    ).value;
    const product = document.getElementById("product_5575913");
    const product_id = document.getElementById("product_5575913").value;
    const product_name =
      product.options[product.selectedIndex].getAttribute("data-name");
    const serial_number = document.getElementById("serial_number").value;
    const order_data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      date_purchased: date_purchased,
      billing_city: PurchaseLocation,
      product_id: product_id,
      product_name: product_name,
      // product_price: product_price,
      // product_category: product_category,
      serial_number: serial_number,
    };
    applyForWarranty(order_data, (err, res) => {
      if (err) {
        console.log("err--->", err);
        document.getElementById("spinner").style.display = "none";
        document.getElementById("error-message").style.display = "block";
        document.getElementById("error-message").innerHTML =
          "Somthing went wrong! Please try again.";
        return false;
      }
      document.getElementById("spinner").style.display = "none";
      document.getElementById("success-message").style.display = "block";
      document.getElementById("success-message").innerHTML =
        "Thank you for purchase warranty";

      // console.log("warrant res ===> ", res);
      window.location.href = `https://blueteesgolf.com/pages/extend-protection-plan?leadToken=${res.lineItems[0].leadToken}&transactionId=${res.transactionId}`;
    });
  }

  
  function datePurchased() {
    document
      .getElementById("date_purchased_85575914")
      .setAttribute("placeholder", "MM/DD");
  }
  // email validation common function
  function validateEmail(email) {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}

