
// ~~~~~~~~~~~~~~~HELPER FUNCTIONS~~~~~~~~~~~~~~~~~

function getPageIds(selectedPages, category) {
  const catObjects = selectedPages.filter(item => item.category === category);
  const catIds = catObjects.map(item => item._id);
  return catIds;
}

function getNonWeeklyPageData(pageIds, data) {
  const pageObjects = data.filter(item => pageIds.includes(item.page_id));
  pageObjects.sort((a, b) => a.yearMonthDay - b.yearMonthDay);
  return pageObjects;
}

function getWeeklyPageData(pageIds, data) {
  const pageObjects = data.filter(item => pageIds.includes(item.page_id));
  pageObjects.sort((a, b) => a.isoYearWeek - b.isoYearWeek);
  return pageObjects;
}

function checkCategoriesExist(selectedPages, cat1, cat2) {
  if (cat2) {
    const hasCat1 = selectedPages.some(item => item.category === cat1);
    const hasCat2 = selectedPages.some(item => item.category === cat2);
    return hasCat1 && hasCat2
  } else {
    return selectedPages.some(item => item.category === cat1);
  }
}

// ~~~~~~~~~~~~~~~ANNUAL~~~~~~~~~~~~~~~~~

function addAnnualPages(nonWeeklyData, selectedPages, pdfFilePaths) {

  const annualIds = getPageIds(selectedPages, "annual");
  console.log(annualIds);

  const pageObjects = getNonWeeklyPageData(annualIds, nonWeeklyData);
  console.log(pageObjects)
  
  // Push PDF pages to pdf array
  for (let i = 0; i < pageObjects.length; i++) {
    pdfFilePaths.push(pageObjects[i].pdf[0])
  }
  console.log(`Annual pages added. PDF array now includes ${pdfFilePaths}`);
  // // Remove 'annual' type from userSelection array so not re-used
  // let index = userSelection.indexOf('annual')
  // if (index !== -1) {
  //   userSelection.splice(index, 1);
  // }
}

// ~~~~~~~~~~~~~~~MONTHLY~~~~~~~~~~~~~~~~~

function addMonthlyPages(nonWeeklyData, selectedPages, pdfFilePaths) {

  const monthlyIds = getPageIds(selectedPages, "monthly");
  console.log(monthlyIds);

  const pageObjects = getNonWeeklyPageData(monthlyIds, nonWeeklyData);
  console.log(pageObjects)
  
  // Push PDF pages to pdf array
  for (let i = 0; i < pageObjects.length; i++) {
    pdfFilePaths.push(pageObjects[i].pdf[0])
  }
  console.log(`Monthly pages added. PDF array now includes ${pdfFilePaths}`);
}

// ~~~~~~~~~~~~~~~WEEKLY ONLY~~~~~~~~~~~~~~~~~

function addWeeklyPages(weeklyData, selectedPages, pdfFilePaths) {

  const weeklyIds = getPageIds(selectedPages, "weekly");
  console.log(weeklyIds);

  const pageObjects = getWeeklyPageData(weeklyIds, weeklyData);
  console.log(pageObjects)
  
  // Push PDF pages to pdf array
  for (let i = 0; i < pageObjects.length; i++) {
    pdfFilePaths.push(pageObjects[i].pdf[0])
  }
  console.log(`Weekly pages added. PDF array now includes ${pdfFilePaths}`);
}

// ~~~~~~~~~~~~~~~DAILY ONLY~~~~~~~~~~~~~~~~~

function addDailyPages(nonWeeklyData, selectedPages, pdfFilePaths) {

  const dailyIds = getPageIds(selectedPages, "daily");
  console.log(dailyIds);

  const pageObjects = getNonWeeklyPageData(dailyIds, nonWeeklyData);
  console.log(pageObjects)
  
  // Push PDF pages to pdf array
  for (let i = 0; i < pageObjects.length; i++) {
    pdfFilePaths.push(pageObjects[i].pdf[0])
  }
  console.log(`Daioly pages added. PDF array now includes ${pdfFilePaths}`);
}

// ~~~~~~~~~~~~~~~DAILY & WEEKLY~~~~~~~~~~~~~~~~~

function addWeeklyAndDailyPages(nonWeeklyData, weeklyData, linedPageData, selectedPages, pdfFilePaths) {
  
  const weeklyIds = getPageIds(selectedPages, "weekly");
  const dailyIds = getPageIds(selectedPages, "daily");

  const weeklyPageObjects = getWeeklyPageData(weeklyIds, weeklyData);
  const dailyPageObjects = getNonWeeklyPageData(dailyIds, nonWeeklyData);

  console.log(weeklyIds);
  console.log(dailyIds);
  console.log(weeklyPageObjects);
  console.log(dailyPageObjects);

  // Add first isoYearWeek, then all daily pages with matching isoYearWeek, then second isoYearWeek …
  for (let i = 0; i < weeklyPageObjects.length; i++) {
    
    // Push each weekly pdf to array
    pdfFilePaths.push(weeklyPageObjects[i].pdf[0])

    // Get its associted isoYearWeek value, to match with coming dailies.
    let isoYearWeek = weeklyPageObjects[i].isoYearWeek;

    // Get only daily files with matching isoYearWeek values, then sort by yearMonthDay ascending
    const matchIso = dailyPageObjects.filter(item => item.isoYearWeek === isoYearWeek);
    matchIso.sort((a, b) => a.yearMonthDay - b.yearMonthDay);

    // Alternate left and right dailies, then add a right-hand lined page at end if odd number of dailies added
    for (let j = 0; j < matchIso.length; j++) {
      if (j === 0 || j % 2 === 0) {
        pdfFilePaths.push(matchIso[i].pdf[0])
      } else {
        pdfFilePaths.push(matchIso[i].pdf[1])
      }
    }
    if (matchIso % 2 > 0) {
      pdfFilePaths.push(linedPageData.pdf[1])
    }
  }
}

// ~~~~~~~~~~~~~~~CHECK FOR PAGE TYPES AND RUN PDF-ADD FUNCTIONS~~~~~~~~~~~~~~~~~

export function generatePdfFilePaths(nonWeeklyData, weeklyData, linedPageData, selectedPages) {

  // Create an empty array to push pdf files into
  let pdfFilePaths = [];

  // Check if categories exist in user selection
  const categoryChecks = [
    () => checkCategoriesExist(selectedPages, "annual"),
    () => checkCategoriesExist(selectedPages, "monthly"),
    () => checkCategoriesExist(selectedPages, "weekly", "daily"),
    () => checkCategoriesExist(selectedPages, "weekly"),
    () => checkCategoriesExist(selectedPages, "daily")
  ]

  const categoryActions = [
    () => addAnnualPages(nonWeeklyData, selectedPages, pdfFilePaths),
    () => addMonthlyPages(nonWeeklyData, selectedPages, pdfFilePaths),
    () => addWeeklyAndDailyPages(nonWeeklyData, weeklyData, linedPageData, selectedPages, pdfFilePaths),
    () => addWeeklyPages(weeklyData, selectedPages, pdfFilePaths),
    () => addDailyPages(nonWeeklyData, selectedPages, pdfFilePaths)
  ]

  if (categoryChecks.length !== categoryActions.length) {
    throw new Error("The number of conditions must match the number of actions");
  }

  if (checkCategoriesExist(selectedPages, "weekly", "daily")) {
    for (let i = 0; i < 2; i++) {
      if (categoryChecks[i]()) {
        categoryActions[i]();
      }
    }
  } else {
    for (let i = 0; i < categoryChecks.length; i++) {
      if (categoryChecks[i]()) {
        categoryActions[i]();
      }
    }
  }
  console.log(`Final PDF array includes: ${pdfFilePaths}`);
  return pdfFilePaths;
}



