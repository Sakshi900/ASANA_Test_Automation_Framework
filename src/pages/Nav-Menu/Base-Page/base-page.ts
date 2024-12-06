import { getLocator } from "../../../utils/locator-utils";

export function getTaskStatus() {
    const taskStatusSelector = '.task-status'; // Common task status selector
    
    // Method to fetch task status
    const getTaskStatus = async (): Promise<string> => {
      return getLocator(taskStatusSelector).innerText();
    };
  
    // You can add more common methods here (like navigation, clicks, etc.)
  
    return {
      getTaskStatus,
     
    };
  }