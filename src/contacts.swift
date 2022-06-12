import AddressBook
import Foundation

let env = ProcessInfo.processInfo.environment;
let excludeEmail = env["af_exclude_email"];

extension Array where Element: Equatable {
    mutating func removeDuplicates() {
        var result = [Element]()
        for value in self {
            if !result.contains(value) {
                result.append(value)
            }
        }
        self = result
    }
}

struct AlfredItem {
  var title: String
  var subtitle: String
  var arg: String

  func toJSON() -> String {
    return "{" +
      "\"title\": \"\(self.title)\"," +
      "\"subtitle\": \"\(self.subtitle.replacingOccurrences(of: "\"", with: "\\\""))\"," +
      "\"arg\": \"\(self.arg.replacingOccurrences(of: "\"", with: "\\\""))\""  +
    "}"
  }
}

var arguments = CommandLine.arguments.dropFirst()
if arguments.isEmpty {
    fputs("No arguments given\n", stderr)
    exit(EXIT_FAILURE)
}

guard let addressBook = ABAddressBook.shared() else {
    fputs("Failed to create address book (check your Contacts privacy settings)\n", stderr)
    exit(EXIT_FAILURE)
}

private func comparison(forProperty property: String, string: String) -> ABSearchElement {
    let comparison: ABSearchComparison = CFIndex(kABContainsSubStringCaseInsensitive.rawValue)
    return ABPerson.searchElement(forProperty: property, label: nil, key: nil, value: string,
        comparison: comparison)
}

let searchString = arguments.first ?? ""
arguments.removeFirst()

let firstNameSearch = comparison(forProperty: kABFirstNameProperty, string: searchString)
let lastNameSearch = comparison(forProperty: kABLastNameProperty, string: searchString)
let emailSearch = comparison(forProperty: kABEmailProperty, string: searchString)
let phoneSearch = comparison(forProperty: kABPhoneProperty, string: searchString)

let orComparison = ABSearchElement(forConjunction: CFIndex(kABSearchOr.rawValue),
    children: [firstNameSearch, lastNameSearch, emailSearch, phoneSearch])

let found = addressBook.records(matching: orComparison) as? [ABRecord] ?? []
if found.count == 0 {
    exit(EXIT_SUCCESS)
}

var formattedContacts: [AlfredItem] = []

var argTwo = arguments.count > 0 ? arguments.first : ""
argTwo = argTwo?.trimmingCharacters(in: .whitespacesAndNewlines)

let displayMsg = argTwo != "" ? arguments.joined(separator: " ") : "Type a message..."
let msg = argTwo != "" ? arguments.joined(separator: " ") : ""

for person in found {
    let firstName = person.value(forProperty: kABFirstNameProperty) as? String ?? ""
    let lastName = person.value(forProperty: kABLastNameProperty) as? String ?? ""
    let emailsProperty = person.value(forProperty: kABEmailProperty) as? ABMultiValue
    let phonesProperty = person.value(forProperty: kABPhoneProperty) as? ABMultiValue

    if excludeEmail != "true" {
        if let emails = emailsProperty  {
            for j in 0..<emails.count() {
                let email = emails.value(at: j) as? String ?? ""
    
                let a = AlfredItem(
                  title: "\(firstName) \(lastName) • \(email)",
                  subtitle: displayMsg,
                  arg: "\(firstName) \(lastName)•••\(email)•••\(msg)"
                )
    
                formattedContacts.append(a)
            }
        }
    }

     if let phones = phonesProperty {
        for i in 0..<phones.count() {
            let phone = phones.value(at: i) as? String ?? ""

            let a = AlfredItem(
              title: "\(firstName) \(lastName) • \(phone)",
              subtitle: displayMsg,
              arg: "\(firstName) \(lastName)•••\(phone)•••\(msg)"
            )

            formattedContacts.append(a)
        }
    }
}


var jsonContacts = formattedContacts.map { $0.toJSON() }
jsonContacts.removeDuplicates()
let contactsString = jsonContacts.joined(separator: ", ")

print("{ \"items\": [" + contactsString + " ]}")
